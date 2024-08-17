import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
  Image,
} from '@chakra-ui/react';
import { uploadFilesToS3 } from '../utils/UploadImageToS3';
import { supabase } from '../../utils/supabaseClient';

const EditMainPage: React.FC = () => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchMainPageData = async () => {
      const { data, error } = await supabase
        .from('home_page')
        .select('description, image_url')
        .returns<{ description: string; image_url: string }[]>()
        .single();

      if (error) {
        toast({
          title: 'Failed to load main page data',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (data) {
        setDescription(data.description);
        setCurrentImageUrl(data.image_url);
      }
    };

    fetchMainPageData();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = currentImageUrl;

      if (selectedImage) {
        const [uploadedImageUrl] = await uploadFilesToS3([selectedImage]);
        imageUrl = uploadedImageUrl;
      }

      const { error } = await supabase
        .from('home_page')
        .update({ description, image_url: imageUrl })
        .eq('id', 1); 

      if (error) throw error;

      toast({
        title: 'Main page updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to update main page',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" mb={4}>
          Edit Main Page
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="image">Change Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)}
              />
              {currentImageUrl && (
                <Box mt={4}>
                  <Image src={currentImageUrl} alt="Current Main Page Image" borderRadius="md" />
                </Box>
              )}
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Save Changes
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default EditMainPage;

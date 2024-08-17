import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  VStack,
  Heading,
  Image,
  HStack,
  IconButton,
  useToast,
  Box,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { uploadFilesToS3 } from '../utils/UploadImageToS3';
import { supabase } from '../../utils/supabaseClient';
import { Project } from '../../types/Projects';

interface ProjectFormProps {
  projectId?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [techStacks, setTechStacks] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // Store existing image URLs
  const toast = useToast();

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .returns<Project[]>()
          .single();

        if (error) {
          toast({
            title: 'Failed to load project',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else if (data) {
          setTitle(data.title);
          setGithubLink(data.github_link);
          setTechStacks(data.tech_stacks);
          setDemoLink(data.demo_link);
          setDescription(data.description);
          setIsFeatured(data.is_featured);
          setExistingImages(data.image_urls || []); // Set existing images
        }
      };

      fetchProject();
    }
  }, [projectId, toast]);

  const handleRemoveImage = async (imageUrl: string) => {
    try {
      const updatedImages = existingImages.filter((url) => url !== imageUrl);

      const { error } = await supabase
        .from('projects')
        .update({ image_urls: updatedImages })
        .eq('id', projectId);

      if (error) throw error;

      setExistingImages(updatedImages);
      toast({
        title: 'Image removed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to remove image',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const urls = selectedFiles.length > 0 ? await uploadFilesToS3(selectedFiles) : [];

      const payload = {
        title,
        github_link: githubLink,
        tech_stacks: techStacks,
        demo_link: demoLink,
        description,
        image_urls: urls.length > 0 ? [...existingImages, ...urls] : existingImages, // Append new images to existing ones
        is_featured: isFeatured,
      };

      const { error } = projectId
        ? await supabase.from('projects').update(payload).eq('id', projectId)
        : await supabase.from('projects').insert([payload]);

      if (error) throw error;

      toast({
        title: projectId ? 'Project updated successfully!' : 'Project created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Failed to ${projectId ? 'update' : 'create'} project`,
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
          {!projectId ? 'Add a Project' : 'Edit Project'}
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="githubLink">GitHub Link</FormLabel>
              <Input
                id="githubLink"
                type="text"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="techStacks">Tech Stacks</FormLabel>
              <Input
                id="techStacks"
                type="text"
                value={techStacks}
                onChange={(e) => setTechStacks(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="demoLink">Demo Link</FormLabel>
              <Input
                id="demoLink"
                type="text"
                value={demoLink}
                onChange={(e) => setDemoLink(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Main Description</FormLabel>
              <Textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="images">Images</FormLabel>
              <Input
                type="file"
                multiple
                onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
              />
              {existingImages.length > 0 && (
                <VStack mt={4} align="stretch" spacing={4}>
                  <Heading as="h5" size="sm">
                    Current Images
                  </Heading>
                  <HStack spacing={4} wrap="wrap">
                    {existingImages.map((imageUrl, index) => (
                      <Box key={index} position="relative" boxSize="100px">
                        <Image src={imageUrl} alt={`Thumbnail ${index}`} boxSize="100%" objectFit="cover" />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          position="absolute"
                          top="2px"
                          right="2px"
                          onClick={() => handleRemoveImage(imageUrl)}
                          aria-label="Remove Image"
                        />
                      </Box>
                    ))}
                  </HStack>
                </VStack>
              )}
            </FormControl>

            <FormControl>
              <Checkbox
                id="isFeatured"
                isChecked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              >
                Featured Project
              </Checkbox>
            </FormControl>

            <Button type="submit" colorScheme="blue">
              {projectId ? 'Save Changes' : 'Submit'}
            </Button>
          </Stack>
        </form>
      </VStack>
    </Container>
  );
};

export default ProjectForm;

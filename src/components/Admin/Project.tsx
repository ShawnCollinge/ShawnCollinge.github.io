import React, { useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { uploadFilesToS3 } from '../utils/UploadImageToS3'; // Import the upload function
import { supabase } from '../../utils/supabaseClient';

const Project: React.FC = () => {
  const [title, setTitle] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [techStacks, setTechStacks] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store selected files

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const urls = await uploadFilesToS3(selectedFiles);

      const { error } = await supabase
        .from('projects')
        .insert([
          {
            title,
            github_link: githubLink,
            tech_stacks: techStacks,
            demo_link: demoLink,
            description,
            image_urls: urls, 
            is_featured: isFeatured,
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Project created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: 'Failed to create project',
        description: (error instanceof Error) ? error.message : "An error occurred",
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
          Add a Project
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
              <Input type="file" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))} />
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
              Submit
            </Button>
          </Stack>
        </form>
      </VStack>
    </Container>
  );
};

export default Project;

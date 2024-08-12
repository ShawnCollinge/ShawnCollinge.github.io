import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  VStack,
  Container,
} from '@chakra-ui/react';
import Carousel from '../components/Carousel'; 
import { supabase } from '../utils/supabaseClient';
import { Project } from '../types/Projects';

const ViewProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const bgColor = useColorModeValue('white', 'gray.700');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        navigate('/projects');
      } else {
        setProject(data);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <Container maxW="container.lg" py={10}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        {project.title}
      </Heading>

      <Carousel images={project.image_urls} />

      <Box mt={10} bg={bgColor} p={6} rounded="md" boxShadow="lg">
        <Heading as="h5" size="lg" mb={4}>
          Description
        </Heading>
        <Text fontSize="lg" mb={4}>
          {project.description}
        </Text>
        <VStack spacing={4} align="stretch">
          <Button
            as="a"
            href={project.github_link}
            target="_blank"
            variant="solid"
            colorScheme="teal"
            size="lg"
          >
            Github
          </Button>
          <Button
            as="a"
            href={project.demo_link}
            target="_blank"
            variant="outline"
            colorScheme="teal"
            size="lg"
            isDisabled={!project.demo_link}
          >
            Demo
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ViewProject;

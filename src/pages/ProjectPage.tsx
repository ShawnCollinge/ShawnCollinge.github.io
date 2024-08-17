import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Spinner,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import Carousel from '../components/Carousel';
import { supabase } from '../utils/supabaseClient';
import { Project } from '../types/Projects';

const ViewProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const descriptionBgColor = useColorModeValue('white', 'gray.700');
  const containerBgColor = useColorModeValue('gray.50', 'gray.900');

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
      <Flex justify="center" align="center" height="80vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="7xl" py={{ base: 20, md: 28 }} bg={containerBgColor} borderRadius="xl" boxShadow="2xl">
      <Stack align="center" spacing={{ base: 8, md: 12 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          textAlign="center"
          position="relative"
          _after={{
            content: "''",
            width: 'full',
            height: '30%',
            position: 'absolute',
            bottom: 1,
            left: 0,
            bg: 'blue.400',
            zIndex: -1,
          }}
          color={textColor}
        >
          {project.title}
        </Heading>

        <Box w="full" mb={10}>
          <Carousel images={project.image_urls} />
        </Box>

        <Box bg={descriptionBgColor} p={8} rounded="lg" boxShadow="lg" w="full" maxW="3xl">
          <Heading as="h5" size="lg" mb={6} color={textColor}>
            Description
          </Heading>
          <Text fontSize="lg" mb={8} color={textColor}>
            {project.description}
          </Text>
          <VStack spacing={4} align="stretch">
            <Button
              as="a"
              href={project.github_link}
              target="_blank"
              variant="solid"
              colorScheme="blue"
              size="lg"
            >
              Github
            </Button>
            <Button
              as="a"
              href={project.demo_link}
              target="_blank"
              variant="outline"
              colorScheme="blue"
              size="lg"
              isDisabled={!project.demo_link}
            >
              Demo
            </Button>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ViewProject;

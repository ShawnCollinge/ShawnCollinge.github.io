import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Stack,
  Box,
  Button,
  Spinner,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import Carousel from '../components/Carousel';
import { supabase } from '../utils/supabaseClient';
import { Project } from '../types/Projects';
import HighlightedHeading from '../components/utils/ContainerUtils';
import { Markdown } from '../utils/markdownUtils';
import { Blob } from '../utils/blob';
import { leftButton, rightButton } from '../utils/buttonProps';

const ViewProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const bgColor = useColorModeValue('blue.50', 'blue.400');
  const textColor = useColorModeValue('gray.500', 'gray.200');

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .returns<Project[]>()
        .single();

      if (error) {
        navigate('/projects');
      } else {
        setProject(data);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (!project) {
    return (
      <Flex justify="center" align="center" height="80vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="7xl" height="100vh" display="flex" alignItems="center">
      <Stack
        align="center"
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 8, md: 10 }}
        justify="space-between"
        width="100%"
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <HighlightedHeading>{project.title}</HighlightedHeading>
          <Box color={textColor} fontSize="lg">
            <Markdown>{project.description}</Markdown>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              {...leftButton}
              as="a"
              href={project.github_link}
              target="_blank"
            >
              Github
            </Button>
            {project.demo_link ? (
              <Button
                {...rightButton}
                as="a"
                href={project.demo_link}
                target="_blank"
              >
                Demo
              </Button>
            ) : (
              <Button
                {...rightButton}
                isDisabled
              >
                Demo
              </Button>
            )}
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify="center"
          align="center"
          position="relative"
          w="full"
          h="100%" 
        >
          <Blob
            w="150%"
            h="150%"
            position="absolute"
            top="-20%"
            left={0}
            zIndex={-1}
            color={bgColor}
          />
          <Box
            position="relative"
            height="350px"
            rounded="2xl"
            boxShadow="2xl"
            width="full"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center" 
          >
            <Carousel images={project.image_urls} />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default ViewProject;

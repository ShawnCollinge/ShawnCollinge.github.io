import React from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  Stack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import useAuthStatus from '../../hooks/useAuthStatus';
import { Project } from '../../types/Projects';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const { isAdmin } = useAuthStatus();
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.800')}
      mb={4}
      p={4} 
    >
        <Image
          src={project.image_urls[0]}
          alt={project.title}
          objectFit="cover"
          w="100%"
          h="200px"
          borderRadius="md"
          onClick={() => navigate(`/projects/${project.id}`)}
        />
      <Box pt={4}> 
        <Heading fontSize="xl" mb={2}>
          {project.title}
        </Heading>
        <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
          {project.tech_stacks}
        </Text>
        <VStack spacing={4} mt={4}>
          <Stack direction="row" spacing={4} justify="center">
            <Button
              as="a"
              href={project.github_link}
              target="_blank"
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              Github
            </Button>
            <Button
              as="a"
              href={project.demo_link || undefined}
              target="_blank"
              size="sm"
              variant="outline"
              colorScheme="teal"
              isDisabled={!project.demo_link}
            >
              Demo
            </Button>
            <Button
              as="a"
              onClick={() => navigate(`/projects/${project.id}`)}
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              More info
            </Button>
          </Stack>
          {isAdmin && (
            <Stack direction="row" spacing={4} justify="center">
              <Button
                as="a"
                href={`/admin/edit/${project.id}`}
                size="sm"
                colorScheme="blue"
              >
                Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => onDelete(project.id)}
              >
                Delete
              </Button>
            </Stack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};


export default ProjectCard;

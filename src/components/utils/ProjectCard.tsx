import React from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

interface Project {
  id: string;
  title: string;
  techStacks: string;
  githubLink: string;
  demoLink: string;
  images: string[];
}

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAdmin }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.800')}
      mb={4}
    >
      <a href={`/projects/${project.id}`}>
        <Image
          src={project.images[0]}
          alt={project.title}
          objectFit="cover"
          w="100%"
          h="200px"
        />
      </a>
      <Box p={4}>
        <Heading fontSize="xl" mb={2}>
          {project.title}
        </Heading>
        <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
          {project.techStacks}
        </Text>
        <Flex justify="space-between" alignItems="center" mt={4}>
          <Stack direction="row" spacing={4}>
            <Button
              as="a"
              href={project.githubLink}
              target="_blank"
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              Github
            </Button>
            <Button
              as="a"
              href={project.demoLink}
              target="_blank"
              size="sm"
              variant="outline"
              colorScheme="teal"
              isDisabled={!project.demoLink}
            >
              Demo
            </Button>
            <Button
              as="a"
              href={`/projects/${project.id}`}
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              More info
            </Button>
          </Stack>
          {isAdmin && (
            <Stack direction="row" spacing={2}>
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
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const handleDelete = (id: string) => {
  console.log(`Delete project with id: ${id}`);
};

export default ProjectCard;

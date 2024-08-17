import React from 'react';
import { Box, SimpleGrid, Heading, useColorModeValue } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';
import { Project } from '../../types/Projects';

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete }) => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      py={10}
      px={5}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Box maxW="container.xl" mx="auto">
        <Heading as="h1" size="2xl" mb={8} textAlign="center">
          All Projects
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={onDelete}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ProjectList;

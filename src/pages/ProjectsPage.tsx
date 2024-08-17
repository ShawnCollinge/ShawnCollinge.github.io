import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import ProjectList from '../components/Project/ProjectList';
import { Project } from '../types/Projects';
import { Flex, Spinner } from '@chakra-ui/react';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*');

    if (error) {
      console.error('Error fetching projects:', error.message);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  };

  const onDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return loading ? (
    <Flex justify="center" align="center" height="80vh">
      <Spinner size="xl" />
    </Flex>
  ) : (
    <ProjectList projects={projects} onDelete={onDelete} />
  );
};

export default ProjectsPage;

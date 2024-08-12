import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; 
import ProjectList from '../components/Project/ProjectList';
import { Project } from '../types/Projects';


const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*'); 

      if (error) {
        console.error('Error fetching projects:', error.message);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <ProjectList projects={projects} />; 
};

export default ProjectsPage;

import React from 'react';
import ProjectForm from '../../components/Admin/Project';
import { useParams } from 'react-router-dom';

const UpdateProject: React.FC = () => {
  const id = useParams<{ id: string }>().id;

  return <ProjectForm projectId={id} />;
};

export default UpdateProject;

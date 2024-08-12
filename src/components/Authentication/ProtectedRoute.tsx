import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';

interface ProtectedRouteProps {
    children: ReactNode;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuthStatus();

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    return <Navigate to="/login" />; 
  }

  if (!isAdmin) {
    return <Navigate to="/" />; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;

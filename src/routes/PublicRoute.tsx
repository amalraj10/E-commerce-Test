import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface PublicRouteProps {
  element: ReactElement;
  restricted?: boolean;
}

const PublicRoute = ({ element: Component, restricted = false }: PublicRouteProps) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (isAuthenticated && restricted) {
    return <Navigate to="/dashboard" />;
  }

  return Component;
};

export default PublicRoute; 
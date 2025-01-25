import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute = ({ element: Component }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? Component : <Navigate to="/auth/signin" />;
};

export default PrivateRoute; 
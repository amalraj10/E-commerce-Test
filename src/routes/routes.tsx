import { RouteObject } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Dashboard from '../pages/dashboard/Dashboard';
import Products from '../pages/products/Products';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'signin',
            element: <PublicRoute element={<SignIn />} restricted={true} />,
          },
          {
            path: 'signup',
            element: <PublicRoute element={<SignUp />} restricted={true} />,
          },
        ],
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <PrivateRoute element={<Dashboard />} />,
          },
          {
            path: 'products',
            element: <PrivateRoute element={<Products />} />,
          },
        ],
      },
      {
        path: '',
        element: <Navigate to="/auth/signin" />,
      },
    ],
  },
]; 
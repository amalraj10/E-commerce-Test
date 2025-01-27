import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';  // This is the layout that wraps your pages
import SignIn from '../components/auth/SignIn';
import Signup from '../components/auth/Signup';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import Home from '../pages/Home';
import DashboardLayout from '../pages/DashboardLayout';
import ProductDetails from '../pages/ProductDetails';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,  // Wrap routes with MainLayout
    children: [
      {
        path: '/',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: '/products-details/:id',
            element: <ProductDetails />,
          },
          {
            path: '/home',
            element: <Home />,
          },
        ]
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

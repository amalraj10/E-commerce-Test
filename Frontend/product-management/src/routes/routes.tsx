import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';  // This is the layout that wraps your pages
import SignIn from '../components/auth/SignIn';
import Signup from '../components/auth/Signup';
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
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: '/products-details',
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

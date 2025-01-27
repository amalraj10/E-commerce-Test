import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || 
                    location.pathname === '/signup' ||
                    location.pathname === '/forgot-password' ||
                    location.pathname === '/reset-password';

  return (
    <div className="app-layout">
      {!isAuthPage && <Navbar />}
      <main
        className="main-content"
        style={{
          minHeight: 'calc(100vh)',
          backgroundColor: '#f0f2f5',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

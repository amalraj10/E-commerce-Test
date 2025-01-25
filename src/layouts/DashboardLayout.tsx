import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 
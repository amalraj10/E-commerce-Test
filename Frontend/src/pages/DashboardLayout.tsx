import React, { useState } from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AddProduct from '../components/product/AddProduct';
import AddCategory from '../components/category/AddCategory';
import AddSubCategory from '../components/category/AddSubCategory';

const DashboardLayout = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isHomePage = location.pathname === '/home';

  return (
    <Layout style={{ background: '#fff' }}>
      <div style={{ 
        padding: '20px 30px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Breadcrumb 
          style={{ 
            fontSize: '14px',
            color: '#666'
          }}
           separator=">"
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          {pathSegments.map((segment, index) => (
            <Breadcrumb.Item key={index}>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        {isHomePage && (
          <div style={{ 
            display: 'flex', 
            gap: '8px'
          }}>
            <Button 
              type="primary" 
              style={{ 
                backgroundColor: '#f7b614', 
                borderColor: '#f7b614' 
              }}
              onClick={() => setIsAddCategoryOpen(true)}
            >
              Add category
            </Button>
            <Button 
              type="primary" 
              style={{ 
                backgroundColor: '#f7b614', 
                borderColor: '#f7b614' 
              }}
              onClick={() => setIsAddSubCategoryOpen(true)}
            >
              Add sub category
            </Button>
            <Button 
              type="primary" 
              style={{ 
                backgroundColor: '#f7b614', 
                borderColor: '#f7b614' 
              }}
              onClick={() => setIsAddProductOpen(true)}
            >
              Add product
            </Button>
          </div>
        )}
      </div>
      <AddCategory open={isAddCategoryOpen} onCancel={() => setIsAddCategoryOpen(false)} />
      <AddSubCategory open={isAddSubCategoryOpen} onCancel={() => setIsAddSubCategoryOpen(false)} />
      <AddProduct open={isAddProductOpen} onCancel={() => setIsAddProductOpen(false)} />
      <Outlet />
    </Layout>
  );
};

export default DashboardLayout;
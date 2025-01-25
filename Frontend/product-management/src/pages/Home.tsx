import React, { useState } from 'react';
import { Layout, Menu, Card, Pagination, Button, Row, Col, Rate, Checkbox, Breadcrumb } from 'antd';
import { RightOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import image from '../assets/Frame 143.png';
import './Home.css';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Sider, Content } = Layout;

const Home = () => {
  const [totalItems] = useState(23);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCategoryChange = (e: CheckboxChangeEvent) => {
    const { value, checked } = e.target;
    setSelectedCategories(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(item => item !== value)
    );
  };

  const categories = [
    {
      key: 'all',
      label: 'All categories'
    },
    {
      key: 'laptop',
      label: 'Laptop',
      children: [
        { key: 'hp', label: <Checkbox onChange={handleCategoryChange} value="hp">HP</Checkbox> },
        { key: 'dell', label: <Checkbox onChange={handleCategoryChange} value="dell">Dell</Checkbox> }
      ]
    },
    {
      key: 'tablet',
      label: 'Tablet'
    },
    {
      key: 'handphones',
      label: 'Handphones'
    }
  ];

  return (
    <Layout style={{ background: '#fff' }}>
      

      <Layout style={{ background: '#fff' }}>
        <Sider width={250} style={{ background: '#fff' }}>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>
              Categories
            </h3>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['laptop']}
              style={{ border: 'none' }}
            >
              {categories.map((category) => (
                category.children ? (
                  <Menu.SubMenu 
                    key={category.key} 
                    title={category.label}
                    expandIcon={<RightOutlined />}
                  >
                    {category.children.map((child) => (
                      <Menu.Item key={child.key}>{child.label}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={category.key}>{category.label}</Menu.Item>
                )
              ))}
            </Menu>
          </div>
        </Sider>
        <Layout style={{ padding: '20px 30px', background: '#fff' }}>
          <Content>
            <Row gutter={[24, 24]}>
              {[...Array(6)].map((_, index) => (
                <Col span={8} key={index}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ padding: '20px', position: 'relative' }}>
                        <img 
                          alt="laptop" 
                          src={image}
                          style={{ width: '100%' }}
                        />
                        <Button
                          type="text"
                          icon={wishlist.includes(index) ? 
                            <HeartFilled style={{ color: '#f7b614', fontSize: '24px' }} /> : 
                            <HeartOutlined style={{ color: '#f7b614', fontSize: '24px' }} />
                          }
                          onClick={() => toggleWishlist(index)}
                          style={{ 
                            position: 'absolute', 
                            top: '10px', 
                            right: '10px',
                            background: 'white',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }}
                        />
                      </div>
                    }
                    style={{ borderRadius: '8px' }}
                  >
                    <Card.Meta 
                      title="HP AMD Ryzen 3" 
                      description={
                        <div>
                          <div style={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>
                            $529.99
                          </div>
                          <Rate disabled defaultValue={5} style={{ fontSize: '12px' }} />
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span>{`${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalItems)} of ${totalItems} items`}</span>
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                showSizeChanger={true}
                onChange={handlePageChange}
                className="custom-pagination"
              />
              <span>{`${pageSize} rows`}</span>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Pagination, Button, Row, Col, Rate, Checkbox, Spin } from 'antd';
import { RightOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
// import image from '../assets/Frame 143.png';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { getProductsAPI } from '../services/productApi';
import { BASE_URL } from '../services/baseUrl';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getCategories } from '../services/categoryApi';
import { getSubCategoriesByCategory } from '../services/subCategoriesApi';
import { getAuthHeaders } from '../utils/headers';

const { Sider, Content } = Layout;

interface MenuChild {
  key: string;
  label: React.ReactNode;
}

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.categories) {
          const categoriesWithSubs = await Promise.all(
            response.categories.map(async (category) => {
              const subCatsResponse = await getSubCategoriesByCategory(category._id);
              return {
                key: category._id,
                label: category.name,
                children: subCatsResponse.success && subCatsResponse.subCategories ? 
                  subCatsResponse.subCategories.map(sub => ({
                    key: sub._id,
                    label: <Checkbox onChange={(e) => handleSubCategoryChange(e, category._id)} value={sub._id}>
                      {sub.name}
                    </Checkbox>
                  })) : []
              };
            })
          );

          setCategories([
            { key: 'all', label: 'All categories' },
            ...categoriesWithSubs
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Only use search results if they exist and are not null
        if (location.state?.searchResults) {
          setProducts(location.state.searchResults);
          setTotalItems(location.state.searchResults.length);
        } else {
          const queryParams = new URLSearchParams();
          if (selectedCategory) queryParams.append('category', selectedCategory);
          if (selectedSubCategory) queryParams.append('subCategory', selectedSubCategory);
          
          const response = await axios.get(
            `${BASE_URL}/product/getProducts?${queryParams.toString()}`,
            { headers: getAuthHeaders() }
          );
          
          setProducts(response.data.products);
          setTotalItems(response.data.count);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.state, selectedCategory, selectedSubCategory]);

  const handleSubCategoryChange = (e: CheckboxChangeEvent, categoryId: string) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategory(categoryId);
      setSelectedSubCategory(value);
    } else {
      setSelectedSubCategory('');
      if (selectedCategory === categoryId) {
        setSelectedCategory('');
      }
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategory('');
      setSelectedSubCategory('');
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubCategory('');
    }
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products-details/${productId}`);
  };

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
              selectedKeys={[selectedCategory || 'all']}
              defaultOpenKeys={['all']}
              style={{ border: 'none' }}
              onClick={({ key }) => handleCategoryClick(key)}
            >
              {categories.map((category) => (
                category.children ? (
                  <Menu.SubMenu 
                    key={category.key} 
                    title={category.label}
                    expandIcon={<RightOutlined />}
                  >
                    {category.children.map((child: MenuChild) => (
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
              {loading ? (
                <div style={{ width: '100%', textAlign: 'center', padding: '50px' }}>
                  <Spin size="large" />
                </div>
              ) : (
                products
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((product) => (
                    <Col span={8} key={product._id}>
                      <Card
                        hoverable
                        onClick={() => handleProductClick(product._id)}
                        cover={
                          <div style={{ padding: '20px', position: 'relative' }}>
                            <img 
                              alt={product.title}
                              src={`${BASE_URL}${product.images[0]}`}
                              style={{ width: '100%' }}
                            />
                            <Button
                              type="text"
                              icon={wishlist.includes(product._id) ? 
                                <HeartFilled style={{ color: '#f7b614', fontSize: '24px' }} /> : 
                                <HeartOutlined style={{ color: '#f7b614', fontSize: '24px' }} />
                              }
                              onClick={() => toggleWishlist(product._id)}
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
                        style={{ borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Card.Meta 
                          title={product.title}
                          description={
                            <div>
                              <div style={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>
                                ${product.variants[0].price}
                              </div>
                              <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                                {product.description}
                              </div>
                              <Rate disabled defaultValue={5} style={{ fontSize: '12px' }} />
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))
              )}
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

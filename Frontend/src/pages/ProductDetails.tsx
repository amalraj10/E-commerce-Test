import React, { useState, useRef, useEffect } from 'react';
import { Layout, Button, Row, Col, Typography, Carousel, Spin, message } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getProductAPI } from '../services/productApi';
import { BASE_URL } from '../services/baseUrl';
import { CarouselRef } from 'antd/es/carousel';
import AddProduct from '../components/product/AddProduct';

const { Content } = Layout;
const { Title } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductAPI(id!);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      message.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleThumbnailClick = (index: number) => {
    carouselRef.current?.goTo(index);
    setActiveIndex(index);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    if (id) {
      fetchProduct();
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{ padding: '20px 30px' }}>
        <Row gutter={40}>
          {/* Left side - Product Images */}
          <Col span={12}>
            <div style={{ 
              border: '1px solid #f0f0f0', 
              borderRadius: '8px', 
              padding: '20px',
              marginBottom: '20px'
            }}>
              <Carousel
                ref={carouselRef}
                beforeChange={(_, next) => setActiveIndex(next)}
              >
                {product.images.map((img: string, index: number) => (
                  <div key={index}>
                    <img 
                      src={`${BASE_URL}${img}`}
                      alt={`Product view ${index + 1}`} 
                      style={{ 
                        width: '100%', 
                        height: 'auto',
                        objectFit: 'contain'
                      }} 
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            
            {/* Thumbnails */}
            <Row gutter={16}>
              {product.images.map((img: string, index: number) => (
                <Col span={6} key={index}>
                  <div 
                    style={{ 
                      border: `1px solid ${activeIndex === index ? '#f7b614' : '#f0f0f0'}`,
                      borderRadius: '8px', 
                      padding: '10px',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s'
                    }}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img 
                      src={`${BASE_URL}${img}`}
                      alt={`Thumbnail ${index + 1}`} 
                      style={{ 
                        width: '100%',
                        opacity: activeIndex === index ? 1 : 0.7
                      }} 
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Right side - Product Details */}
          <Col span={12}>
            <Title level={3}>{product.title}</Title>
            <Title level={3} style={{ color: '#000', marginTop: '8px' }}>
              ${product.variants[selectedVariant].price}
            </Title>
            
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Title level={5} style={{ margin: 0 }}>Availability:</Title>
                <span style={{ color: '#52c41a' }}>✓</span>
                <span style={{ color: '#52c41a' }}>In stock</span>
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                Hurry up! only {product.variants[selectedVariant].quantity} product left in stock!
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Title level={5} style={{ margin: 0, minWidth: '60px' }}>Ram:</Title>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.variants.map((variant: any, index: number) => (
                    <Button 
                      key={index}
                      type={selectedVariant === index ? 'primary' : 'default'}
                      style={{ 
                        width: '80px',
                        color:"black",
                        ...(selectedVariant === index && {
                          backgroundColor: '#d9dcde',
                          borderColor: '#d9dcde',
                          
                        })
                      }}
                      onClick={() => setSelectedVariant(index)}
                    >
                      {variant.ram}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Title level={5} style={{ margin: 0, minWidth: '60px' }}>Quantity:</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >-</Button>
                  <span>{quantity}</span>
                  <Button 
                    onClick={() => setQuantity(prev => prev + 1)}
                  >+</Button>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginTop: '30px' 
            }}>
              <Button 
                type="primary"
                onClick={() => setIsEditModalOpen(true)}
                style={{ 
                  backgroundColor: '#f7b614', 
                  borderColor: '#f7b614',
                  height: '40px',
                  width: '150px'
                }}
              >
                Edit product
              </Button>
              <Button 
                type="primary"
                style={{ 
                  backgroundColor: '#f7b614', 
                  borderColor: '#f7b614',
                  height: '40px',
                  width: '150px'
                }}
              >
                Buy it now
              </Button>
              <Button 
                icon={<HeartOutlined />}
                style={{ 
                  height: '40px',
                  width: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  borderColor: '#f5f5f5'
                }}
              />
            </div>
          </Col>
        </Row>
      </Content>
      <AddProduct
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        productId={id}
        onSuccess={handleEditSuccess}
      />
    </Layout>
  );
};

export default ProductDetails;
import React, { useState, useRef } from 'react';
import { Layout, Button, Row, Col, Typography, Carousel } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import image from '../assets/Frame 143.png';
import { CarouselRef } from 'antd/es/carousel';

const { Content } = Layout;
const { Title } = Typography;

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef<CarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sample images array - replace with your actual images
  const images = [image, image, image, image];

  const handleThumbnailClick = (index: number) => {
    carouselRef.current?.goTo(index);
    setActiveIndex(index);
  };

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
                {images.map((img, index) => (
                  <div key={index}>
                    <img 
                      src={img} 
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
              {images.map((img, index) => (
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
                      src={img} 
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
            <Title level={3}>HP AMD Ryzen 3</Title>
            <Title level={3} style={{ color: '#000', marginTop: '8px' }}>$529.99</Title>
            
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Title level={5} style={{ margin: 0 }}>Availability:</Title>
                <span style={{ color: '#52c41a' }}>✓</span>
                <span style={{ color: '#52c41a' }}>In stock</span>
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                Hurry up! only 34 product left in stock!
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Title level={5} style={{ margin: 0, minWidth: '60px' }}>Ram:</Title>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button style={{ width: '80px' }}>4 GB</Button>
                  <Button style={{ width: '80px' }}>8 GB</Button>
                  <Button style={{ width: '80px' }}>16 GB</Button>
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
    </Layout>
  );
};

export default ProductDetails;
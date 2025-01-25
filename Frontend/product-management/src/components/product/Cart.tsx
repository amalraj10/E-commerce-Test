import React from 'react';
import { Drawer, Rate } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import image from '../../assets/Frame 143.png';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  return (
    <Drawer
      title={
        <div style={{ 
            fontSize: '16px', 
            fontWeight: 'bold'
          }}>
            Item
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      styles={{
        header: {
          backgroundColor: "#004b6b"
        }
      }}
      closeIcon={
        <CloseOutlined style={{ 
          fontSize: '16px', 
          position: 'absolute',
          right: '20px',
          top: '20px',
          zIndex: 1
        }} 
        
      />}
      footer={null}
    >
      <div style={{ padding: '20px 0' }}>
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 0',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <img
              src={image}
              alt="HP AMD Ryzen 3"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'contain',
                borderRadius: '4px'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '4px',
                alignItems: 'flex-start'
              }}>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  HP AMD Ryzen 3
                </h4>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  <CloseOutlined style={{ fontSize: '12px', color: '#000' }} />
                </div>
              </div>
              <Rate 
                disabled 
                defaultValue={5} 
                style={{ 
                  fontSize: '12px',
                  color: '#f8a900'
                }} 
              />
              <div style={{ 
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '8px'
              }}>
                $529.99
              </div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default Cart;
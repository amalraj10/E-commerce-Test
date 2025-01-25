import React, { useState } from 'react';
import { Modal, Input, Select, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload/interface';

interface Variant {
  ram: string;
  price: number;
  qty: number;
}

interface AddProductProps {
  open: boolean;
  onCancel: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ open, onCancel }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [variants, setVariants] = useState<Variant[]>([{ ram: '', price: 0, qty: 1 }]);

  const handleAddVariant = () => {
    setVariants([...variants, { ram: '', price: 0, qty: 1 }]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    }
  };

  const handleQtyChange = (index: number, type: 'increase' | 'decrease') => {
    const newVariants = [...variants];
    if (type === 'increase') {
      newVariants[index].qty += 1;
    } else if (newVariants[index].qty > 1) {
      newVariants[index].qty -= 1;
    }
    setVariants(newVariants);
  };

  const onFileChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      title="Add Product"
      open={open}
      onCancel={onCancel}
      width={800}
      modalRender={(node) => (
        <div style={{ textAlign: 'center' }}>{node}</div>
      )}
      styles={{ 
        header: { textAlign: 'center' }
      }}
      centered
      footer={[
        <Button key="discard" style={{ borderRadius: '4px', width: '100px' }}>
          DISCARD
        </Button>,
        <Button 
          key="add" 
          type="primary" 
          style={{ 
            backgroundColor: '#f7b614', 
            borderRadius: '4px',
            width: '100px',
            border: 'none'
          }}
        >
          ADD
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px 0' }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Title :</div>
          <Input 
            placeholder="HP AMD Ryzen 3" 
            style={{ 
              flex: 1,
              height: '40px',
              borderRadius: '4px'
            }} 
          />
        </div>

        <div style={{ display: 'flex', gap: '90px' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Variants :</div>
          <div style={{ flex: 1 }}>
            {variants.map((variant, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  marginBottom: index !== variants.length - 1 ? '16px' : '0',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#888', fontSize: '14px' }}>Ram:</div>
                  <Input 
                    placeholder="4 GB" 
                    style={{ 
                      width: '120px',
                      height: '36px',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#888', fontSize: '14px' }}>Price:</div>
                  <Input 
                    prefix="$" 
                    placeholder="529.99" 
                    style={{ 
                      width: '120px',
                      height: '36px',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ color: '#888', fontSize: '14px' }}>QTY:</div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    width: 'fit-content'
                  }}>
                    <button 
                      onClick={() => handleQtyChange(index, 'decrease')}
                      style={{ 
                        border: 'none',
                        borderRight: '1px solid #d9d9d9',
                        backgroundColor: '#fafafa',
                        padding: '4px 12px',
                        cursor: 'pointer',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      ‹
                    </button>
                    <Input 
                      value={variant.qty} 
                      readOnly
                      style={{ 
                        width: '50px',
                        height: '36px',
                        textAlign: 'center',
                        border: 'none',
                        borderRadius: '0'
                      }} 
                    />
                    <button 
                      onClick={() => handleQtyChange(index, 'increase')}
                      style={{ 
                        border: 'none',
                        borderLeft: '1px solid #d9d9d9',
                        backgroundColor: '#fafafa',
                        padding: '4px 12px',
                        cursor: 'pointer',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      ›
                    </button>
                  </div>
                </div>
                {variants.length > 1 && (
                  <span 
                    onClick={() => handleRemoveVariant(index)}
                    style={{
                      position: 'absolute',
                      right: '0px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    ×
                  </span>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button 
                onClick={handleAddVariant}
                style={{ 
                  height: '36px',
                  borderRadius: '4px',
                  backgroundColor: '#3d3d3d',
                  color: 'white',
                  border: 'none'
                }}
              >
                Add variants
              </Button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Sub category :</div>
          <Select
            placeholder="HP"
            style={{ 
              flex: 1,
              height: '40px'
            }}
            options={[{ value: 'hp', label: 'HP' }]}
          />
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Description :</div>
          <Input 
            placeholder="The Ryzen 7 is a more high-end processor that compares to the Int..."
            style={{ 
              flex: 1,
              height: '40px',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Upload Image:</div>
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onFileChange}
              maxCount={3}
            >
              {fileList.length < 3 && (
                <div style={{ color: '#888' }}>
                  <PlusOutlined />
                </div>
              )}
            </Upload>
          </ImgCrop>
        </div>
      </div>
    </Modal>
  );
};

export default AddProduct;
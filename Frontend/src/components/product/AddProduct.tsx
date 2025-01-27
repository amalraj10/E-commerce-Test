import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload/interface';
import { addProductAPI, editProductAPI, getProductAPI } from '../../services/productApi';
import { getCategories } from '../../services/categoryApi';
import { getSubCategoriesByCategory } from '../../services/subCategoriesApi';
import { BASE_URL } from '../../services/baseUrl';

interface Variant {
  ram: string;
  price: number;
  qty: number;
}

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
}

interface AddProductProps {
  open: boolean;
  onCancel: () => void;
  productId?: string;
  onSuccess?: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ open, onCancel, productId, onSuccess }) => {
  // State management
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [variants, setVariants] = useState<Variant[]>([{ ram: '', price: 0, qty: 1 }]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        message.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);
  console.log(category);

  // Fetch subcategories when category changes
 useEffect(() => {
    const fetchSubCategories = async () => {
      if (!category) {
        setSubCategories([]);
        return;
      }
      try {
        const response = await getSubCategoriesByCategory(category);
        if (response.success && response.subCategories) {
          setSubCategories(response.subCategories);
        }
      } catch (error) {
        message.error('Failed to fetch subcategories');
      }
    };
    fetchSubCategories();
  }, [category]);

  // Fetch product details if in edit mode
useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      
      try {
        const response = await getProductAPI(productId);
        const product = response.data.product;
        
        // Populate form fields
        setTitle(product.title);
        setDescription(product.description);
        setCategory(product.category._id);
        setSubCategory(product.subCategory._id);
        setVariants(product.variants.map((v: any) => ({
          ram: v.ram,
          price: v.price,
          qty: v.quantity
        })));
        
        // Convert backend image paths to Upload file list format
        const existingImages = product.images.map((path: string, index: number) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: 'done',
          url: `${BASE_URL}${path}`,
        }));
        setFileList(existingImages);
      } catch (error) {
        message.error('Failed to fetch product details');
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Variant handlers
  const handleAddVariant = () => {
    setVariants([...variants, { ram: '', price: 0, qty: 1 }]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    }
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
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

  // File upload handler
  const onFileChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  // Form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validation
      if (!title || !description || !category || !subCategory || variants.some(v => !v.ram || !v.price)) {
        message.error('Please fill in all required fields');
        return;
      }

      if (fileList.length === 0) {
        message.error('Please upload at least one image');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      
      variants.forEach((variant, index) => {
        formData.append(`variants[${index}][ram]`, variant.ram);
        formData.append(`variants[${index}][price]`, variant.price.toString());
        formData.append(`variants[${index}][quantity]`, variant.qty.toString());
      });
      
      // Only append new image files, not existing ones
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('images', file.originFileObj);
        }
      });

      const response = productId
        ? await editProductAPI(productId, formData)
        : await addProductAPI(formData);

      if (response.status === 200 || response.status === 201) {
        message.success(`Product ${productId ? 'updated' : 'added'} successfully`);
        onSuccess?.();
        onCancel();
        // Reset form
        setTitle('');
        setDescription('');
        setCategory('');
        setSubCategory('');
        setVariants([{ ram: '', price: 0, qty: 1 }]);
        setFileList([]);
      }
    } catch (error) {
      message.error(`Failed to ${productId ? 'update' : 'add'} product`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={productId ? "Edit Product" : "Add Product"}
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
        <Button 
          key="discard" 
          onClick={onCancel}
          style={{ borderRadius: '4px', width: '100px' }}
        >
          DISCARD
        </Button>,
        <Button 
          key="add" 
          type="primary" 
          onClick={handleSubmit}
          loading={loading}
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
        {/* Title Input */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Title :</div>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title" 
            style={{ 
              flex: 1,
              height: '40px',
              borderRadius: '4px'
            }} 
          />
        </div>

        {/* Variants Section */}
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
                    value={variant.ram}
                    onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
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
                    value={variant.price || ''}
                    onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                    placeholder="529.99" 
                    type="number"
                    style={{ 
                      width: '120px',
                      height: '36px',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
                
                {/* Quantity Controls */}
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

        {/* Category Select */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Category :</div>
          <Select
            value={category}
            onChange={(value) => {
              setCategory(value);
              setSubCategory(''); // Reset subcategory when category changes
            }}
            placeholder="Select Category"
            style={{ 
              flex: 1,
              height: '40px'
            }}
            options={categories.map(cat => ({ 
              value: cat._id, 
              label: cat.name 
            }))}
          />
        </div>

        {/* Sub Category Select */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Sub category :</div>
          <Select
            value={subCategory}
            onChange={(value) => setSubCategory(value)}
            placeholder="Select Sub Category"
            style={{ 
              flex: 1,
              height: '40px'
            }}
            options={subCategories.map(subCat => ({ 
              value: subCat._id, 
              label: subCat.name 
            }))}
            disabled={!category} // Disable if no category is selected
          />
        </div>

        {/* Description Input */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Description :</div>
          <Input 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ 
              flex: 1,
              height: '40px',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Image Upload */}
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ width: '120px', color: '#888', fontSize: '14px' }}>Upload Image:</div>
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onFileChange}
              maxCount={3}
              beforeUpload={() => false}
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
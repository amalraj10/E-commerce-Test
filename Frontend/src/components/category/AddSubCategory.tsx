import React, { useState, useEffect } from 'react';
import { Modal, Select, Input, Button, message } from 'antd';
import { getCategories } from '../../services/categoryApi';
import { addSubCategory } from '../../services/subCategoriesApi';

interface AddSubCategoryProps {
  open: boolean;
  onCancel: () => void;
}

interface Category {
  _id: string;
  name: string;
}

const AddSubCategory: React.FC<AddSubCategoryProps> = ({ open, onCancel }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subCategoryName, setSubCategoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  }, []);

//get all categories
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success && response.categories) {
        setCategories(response.categories);
      }
    } catch {
      message.error('Failed to fetch categories');
    }
  };

  //add sub category
  const handleSubmit = async () => {
    if (!selectedCategory || !subCategoryName.trim()) {
      message.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await addSubCategory(subCategoryName.trim(), selectedCategory);
      if (response.success) {
        message.success('Sub category added successfully');
        setSelectedCategory('');
        setSubCategoryName('');
        onCancel();
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to add sub category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Sub Category"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={400}
      centered
      styles={{
        header: {
          textAlign: 'center',
          marginBottom: '24px'
        },
        body: {
          padding: '0 24px 24px'
        }
      }}
    >
      <div>
        <Select
          placeholder="Select category"
          style={{ 
            width: '100%', 
            marginBottom: '16px', 
            height: '40px',
            fontSize: '14px'
          }}
          value={selectedCategory || undefined}
          onChange={(value) => setSelectedCategory(value)}
        >
          {categories.map((category) => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder="Enter sub category name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          style={{ 
            marginBottom: '24px',
            height: '40px',
            width: '100%',
            fontSize: '14px',
            padding: '8px 12px'
          }}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px'
        }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{
              backgroundColor: '#f7b614',
              borderColor: '#f7b614',
              width: '80px'
            }}
          >
            ADD
          </Button>
          <Button
            onClick={onCancel}
            style={{ width: '80px' }}
          >
            DISCARD
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubCategory;
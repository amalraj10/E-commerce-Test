import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { addCategory } from '../../services/categoryApi';

interface AddCategoryProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ open, onCancel, onSuccess }) => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      message.error('Please enter a category name');
      return;
    }

    setLoading(true);
    try {
      await addCategory(categoryName.trim());
      message.success('Category added successfully');
      setCategoryName('');
      onSuccess?.();
      onCancel();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add Category"
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
      <Input
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
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
          disabled={loading}
          style={{ width: '80px' }}
        >
          DISCARD
        </Button>
      </div>
    </Modal>
  );
};

export default AddCategory;
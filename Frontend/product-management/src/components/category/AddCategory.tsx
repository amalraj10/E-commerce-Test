import React from 'react';
import { Modal, Input, Button } from 'antd';

interface AddCategoryProps {
  open: boolean;
  onCancel: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ open, onCancel }) => {
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
    </Modal>
  );
};

export default AddCategory;
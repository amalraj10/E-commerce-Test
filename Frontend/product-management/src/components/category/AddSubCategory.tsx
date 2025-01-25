import React from 'react';
import { Modal, Select, Input, Button } from 'antd';

interface AddSubCategoryProps {
  open: boolean;
  onCancel: () => void;
}

const AddSubCategory: React.FC<AddSubCategoryProps> = ({ open, onCancel }) => {
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
        />
        <Input
          placeholder="Enter sub category name"
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
      </div>
    </Modal>
  );
};

export default AddSubCategory;
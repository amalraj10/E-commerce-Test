import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, Form, Input, Button, message } from "antd";
import { LockOutlined } from '@ant-design/icons';
import { resetPasswordAPI } from "../../services/authApi";
import loginBg from "../../assets/signInbg.png";

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      setLoading(true);
      const token = searchParams.get('token');
      const email = searchParams.get('email');
      
      if (!token || !email) {
        message.error('Invalid reset link');
        return;
      }

      await resetPasswordAPI(token, values.password, email);
      message.success('Password has been reset successfully!');
      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container" style={{ height: "100vh", width: "100%", overflow: "hidden", display: "flex" }}>
      <Row style={{ width: "100%", margin: 0 }}>
        <Col
          xs={24}
          md={16}
          style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            height: "100vh"
          }}
        >
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <h1 style={{ 
              color: "#EDA415", 
              fontSize: "32px", 
              marginBottom: "20px",
              fontWeight: "600",
              textAlign: "center"
            }}>
              Reset Password
            </h1>
            <p style={{ 
              textAlign: "center", 
              marginBottom: "40px",
              color: "#666"
            }}>
              Please enter your new password
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ width: "100%" }}
            >
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your new password!" },
                  { min: 6, message: "Password must be at least 6 characters long" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ 
                    fontSize: '20px', 
                    color: '#666',
                    marginRight: '10px' 
                  }} />}
                  placeholder="New Password"
                  size="large"
                  style={{ 
                    height: '55px', 
                    borderRadius: '12px',
                    background: '#F8F8F8',
                    border: 'none',
                    padding: '0 15px'
                  }}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  { min: 6, message: "Password must be at least 6 characters long" }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ 
                    fontSize: '20px', 
                    color: '#666',
                    marginRight: '10px' 
                  }} />}
                  placeholder="Confirm Password"
                  size="large"
                  style={{ 
                    height: '55px', 
                    borderRadius: '12px',
                    background: '#F8F8F8',
                    border: 'none',
                    padding: '0 15px'
                  }}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{ 
                  background: "#EDA415", 
                  borderColor: "#EDA415",
                  height: '48px',
                  width: '100%',
                  borderRadius: '38px',
                  marginTop: "20px"
                }}
              >
                Reset Password
              </Button>
            </Form>
          </div>
        </Col>

        <Col
          xs={24}
          md={8}
          style={{
            background: `url(${loginBg}) no-repeat center center`,
            backgroundSize: "cover",
            height: "100vh"
          }}
        />
      </Row>
    </div>
  );
};

export default ResetPassword;
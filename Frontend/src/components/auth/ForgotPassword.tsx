import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { forgotPasswordAPI, resetPasswordAPI } from "../../services/authApi";
import loginBg from "../../assets/signInbg.png";

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 for email, 2 for OTP and password
  const [email, setEmail] = useState("");

  const handleSendOTP = async (values: { email: string }) => {
    try {
      setLoading(true);
      await forgotPasswordAPI(values.email);
      setEmail(values.email);
      message.success('OTP has been sent to your email!');
      setStep(2);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await forgotPasswordAPI(email);
      message.success('New OTP has been sent to your email!');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values: { 
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      setLoading(true);
      await resetPasswordAPI(values.otp, values.newPassword, values.email);
      message.success('Password reset successful!');
      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container" style={{ height: "100vh", width: "100%", overflow: "hidden", display: "flex" }}>
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
              {step === 1 ? 'Forgot Password' : 'Reset Password'}
            </h1>
            <p style={{ 
              textAlign: "center", 
              marginBottom: "40px",
              color: "#666"
            }}>
              {step === 1 
                ? 'Enter your email address and we will send you an OTP to reset your password.'
                : 'Enter the OTP sent to your email and set your new password.'}
            </p>

            {step === 1 ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSendOTP}
                style={{ width: "100%" }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ fontSize: '20px', color: '#666', marginRight: '10px' }} />}
                    placeholder="Email"
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
                  Send OTP
                </Button>
              </Form>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleResetPassword}
                initialValues={{ email }}
                style={{ width: "100%" }}
              >
                <Form.Item
                  name="email"
                  hidden
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="otp"
                  rules={[{ required: true, message: "Please input the OTP!" }]}
                >
                  <Input
                    placeholder="Enter OTP"
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
                  name="newPassword"
                  rules={[
                    { required: true, message: "Please input your new password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                    { max: 10, message: "Password cannot exceed 10 characters!" },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
                      message: "Password must contain uppercase, lowercase, number and special character!"
                    }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ fontSize: '20px', color: '#666', marginRight: '10px' }} />}
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
                    { min: 6, message: "Password must be at least 6 characters!" },
                    { max: 10, message: "Password cannot exceed 10 characters!" },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
                      message: "Password must contain uppercase, lowercase, number and special character!"
                    }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ fontSize: '20px', color: '#666', marginRight: '10px' }} />}
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
                  type="link"
                  onClick={handleResendOTP}
                  style={{ padding: 0, height: 'auto', marginBottom: '20px' }}
                >
                  Resend OTP
                </Button>

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
            )}

            <Button 
              type="link" 
              onClick={() => navigate('/')}
              style={{ 
                display: 'block', 
                margin: '20px auto',
                color: '#666'
              }}
            >
              Back to Sign In
            </Button>
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

export default ForgotPassword;
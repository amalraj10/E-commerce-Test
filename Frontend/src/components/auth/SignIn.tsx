import React from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/signInbg.png";
import { Row, Col, Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { loginAPI } from "../../services/authApi";
import { message } from "antd";

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginAPI(values);
      if (response.data) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        message.success('Successfully logged in!');
        navigate('/home'); // or wherever you want to redirect after login
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container" style={{ height: "100vh", width: "100%", overflow: "hidden", display: "flex" }}>
      <Row style={{ width: "100%", margin: 0 }}>
        {/* Left Side - Login Form */}
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
              marginBottom: "40px",
              fontWeight: "600", 
             textAlign: "center"
            }}>
              <span>Sign In to</span><br />
              <span>Your Account</span>
            </h1>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
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
                  prefix={<MailOutlined style={{ 
                    fontSize: '20px', 
                    color: '#666',
                    marginRight: '10px' 
                  }} />}
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

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                  { max: 10, message: "Password cannot exceed 10 characters!" },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
                    message: "Password must contain uppercase, lowercase, number and special character!"
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ 
                    fontSize: '20px', 
                    color: '#666',
                    marginRight: '10px' 
                  }} />}
                  placeholder="Password"
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

              <div style={{ 
                textAlign: "center", 
                marginBottom: "20px",
                marginTop: "-10px" 
              }}>
                <a href="./forgot-password" style={{ 
                  color: '#666',
                  fontSize: "14px",
                  textDecoration: "none"
                }}>
                  forgot password?
                </a>
              </div>
              
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ 
                  background: "#EDA415", 
                  borderColor: "#EDA415",
                  height: '48px',
                  width: '100%',
                  borderRadius: '38px',
                  marginTop: "20px"
                }}
              >
                SIGN IN
              </Button>
            </Form>
          </div>
        </Col>

        {/* Right Side */}
        <Col
          xs={24}
          md={8}
          style={{
            background: `url(${loginBg}) no-repeat center center`,
            backgroundSize: "cover",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 40px",
            textAlign: "center"
          }}
        >
          <h1 style={{
            fontSize: "48px",
            color: "white",
            marginBottom: "20px"
          }}>Hello Friend!</h1>
          <p style={{
            fontSize: "18px",
            color: "white",
            opacity: 0.8,
            lineHeight: "1.5",
            marginBottom: "30px"
          }}>
            Enter your personal details and<br />
            start your journey with us
          </p>
          <Button 
            ghost 
            size="large"
            onClick={() => navigate('/signup')}
            style={{
              width: '200px',
              height: '48px',
              borderRadius: '38px',
              borderColor: "white",
              color: "white"
            }}
          >
            SIGN UP
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;

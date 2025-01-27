import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupbg from "../../assets/signupbg.png";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { registerAPI } from "../../services/authApi";
import { message } from "antd";

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: {name: string, email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await registerAPI(values);
      console.log(response);
      message.success("Registration successful!");
      navigate("/");
    } catch(error: any)  {
      if (error?.response?.data?.error?.includes('duplicate key') || 
          error?.response?.data?.error?.includes('already exists')) {
        message.warning("This email is already registered!");
      } else {
        message.error("Registration failed. Please try again.");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container" style={{ height: "100vh", width: "100%", overflow: "hidden", display: "flex" }}>
      <Row style={{ width: "100%", margin: 0 }}>
        {/* Left Side */}
        <Col
          xs={24}
          md={8}
          style={{
            background: `url(${signupbg}) no-repeat center center`,
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
          }}>Welcome Back!</h1>
          <p style={{
            fontSize: "18px",
            color: "white",
            opacity: 0.8,
            lineHeight: "1.5",
            marginBottom: "30px"
          }}>
            To keep connected with us please<br />
            login with your personal info
          </p>
          <Button 
            ghost 
            size="large"
            onClick={handleSignInClick}
            style={{
              width: '200px',
              height: '48px',
              borderRadius: '38px',
              borderColor: "white",
              color: "white"
            }}
          >
            SIGN IN
          </Button>
        </Col>

        {/* Right Side - Sign Up Form */}
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
              Create Account
            </h1>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ width: "100%" }}
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your name!" },
                  // { type: "email", message: "Please enter a valid name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ 
                    fontSize: '20px', 
                    color: '#666',
                    marginRight: '10px' 
                  }} />}
                  placeholder="Name"
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
                loading={loading}
              >
                SIGN UP
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;

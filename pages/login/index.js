import React from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router'
// import 'antd/dist/antd.css';
import './login.less';
import { Form, Input, Button, message, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "src/api/services/login";

const LoginForm = () => {
    const router = useRouter()
    const onFinish = async values => {
      if(values.username=="admin@drivo.com" && values.password=="admin123"){
        localStorage.setItem('isUserLogin', true);
        window.location.href='/'
      } else {
        message.error("Please Enter Valid Credentials")
        }
        //const response = await login(values);
        
        // if (response.data && response.data.data) {
        //     const user = {
        //         email: response.data.data.emailId,
        //         token: response.data.data.token,
        //         userName: response.data.data.username.userName,
        //         userId: response.data.data.username.id,

        //         userPermissions: response.data.data.rmsUser.data,
                
        //     };

        //     const userData = JSON.stringify({ email: user.email, token: user.token, userName: user.userName });
        //     const startDate = Date.now();
        //     const expiry = startDate + (4.5 * (24 * 60 * 60 * 1000));
            
        //     localStorage.setItem('ls.startDate', startDate);
        //     localStorage.setItem('ls.expiryDate', expiry); 
            

        //     localStorage.setItem('ls.emailId', user.email);
        //     localStorage.setItem('ls.userName', user.userName);
        //     localStorage.setItem('ls.userId', user.userId);
        //     localStorage.setItem('ls.user', userData);
        //     localStorage.setItem('ls.userPermissions', JSON.stringify(user.userPermissions));

        //     // window.location.href = '/v2'
        //     window.location.href='/'
        // } else {
        //     if (response.data && response.data.error) {
        //         message.error(response.data.error.errorMessage)

        //     } else {
        //         message.error('OOPs something went wrong!!')
        //     }
        // }
    };

    return (
        <div className='containerLogin'>
            <Row justify="space-around" type="flex">
                <Col xs={7} style={{ marginTop: 20 }}>

                    <Card
                        bordered
                        hoverable
                    >
                        <div className="cardHeader">
                            <img src="/images/logo.png" alt="icon" className="logo" />
                            <h2 className="heading">Drivo Platform</h2>
                            <p className="cred">Sign in with Your Credentials</p>
                        </div>

                        <Form
                            name="normal_login"
                            className="loginForm"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="loginFormButton">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col></Row>
        </div>

    );
};

export default LoginForm
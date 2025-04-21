import React, { useState } from 'react';
import { Button, Form, Input, theme, Carousel, Typography, Grid, message, notification } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { RegisterAPI } from '../../services/Api-handle';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const RegisterPage = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const [isSubmit, setIsSumbit] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSumbit(true);
        const result = await RegisterAPI(fullName, email, password, phone);
        setIsSumbit(false)
        if (result.data._id) {
            message.success('Đăng ký thành công');
            navigate("/login")
        } else {
            notification.error({
                message: "Something went wrongs",
                description: JSON.stringify(result.message),
                duration: 3
            })
        }
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.paddingXL}px ${token.padding}px`,
            width: "380px"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: token.marginXL,
            textAlign: "center"
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
        },
        signup: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%"
        },
        text: {
            color: token.colorTextSecondary
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
        }
    };
    return (
        <div className='register-form' style={{ display: "flex", padding: "10px", alignItems: "center", margin: "10px 100px 100px 100px", justifyContent: "space-between" }}>
            <div style={{ width: "50%", }} >
                <h2>New events available now</h2>
                <Carousel autoplay>
                    <div>
                        <img style={{ height: "500px", width: "800px", objectFit: "contain" }} src="https://essential-japan.com/wp-content/uploads/2025/04/lycoris-recoil-cafe-1024x573.webp" alt="" />
                    </div>
                    <div>
                        <img style={{ height: "500px", width: "800px", objectFit: "contain" }} src="https://cmex.kyoto/wp-content/uploads/2023/03/29d3bc99193cb0b837fb8cc53f050ae5-1-1024x787.jpg" alt="" />
                    </div>
                    <div>
                        <img style={{ height: "500px", width: "800px", objectFit: "contain" }} src="https://a.storyblok.com/f/178900/1199x848/250d6c0e0c/makeine-too-many-losing-heroines-event-visual.jpg/m/filters:quality(95)format(webp)" alt="" />
                    </div>
                    <div>
                        <img style={{ height: "500px", width: "800px", objectFit: "cover" }} src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/jump-festa-kv.jpg?q=70&fit=crop&w=1140&h=&dpr=1" alt="" />
                    </div>
                </Carousel>

            </div>
            <div style={{ margin: "auto" }}>
                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.header}>
                            <svg
                                width="33"
                                height="32"
                                viewBox="0 0 33 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="0.125" width="32" height="32" rx="6.4" fill="#1890FF" />
                                <path
                                    d="M19.3251 4.80005H27.3251V12.8H19.3251V4.80005Z"
                                    fill="white"
                                />
                                <path d="M12.925 12.8H19.3251V19.2H12.925V12.8Z" fill="white" />
                                <path d="M4.92505 17.6H14.525V27.2001H4.92505V17.6Z" fill="white" />
                            </svg>

                            <Title style={styles.title}>Sign up</Title>
                            <Text style={styles.text}>
                                Join us now! Create an account to get started.
                            </Text>
                        </div>
                        <Form
                            name="normal_signup"
                            onFinish={onFinish}
                            layout="vertical"
                            requiredMark="optional"
                        >
                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Name!",
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        required: true,
                                        message: "Please input your Email!",
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                extra="Password needs to be at least 8 characters."
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        type: "phone",
                                        required: true,
                                        message: "Please input your phone number!",
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="your phone" />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: "0px" }}>
                                <Button block type="primary" htmlType="submit" loading={isSubmit}>
                                    Sign up
                                </Button>
                                <div style={styles.signup}>
                                    <Text style={styles.text}>Already have an account?</Text>{" "}
                                    <Link href="/login">Sign in</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        </div>
    )

}
export default RegisterPage;
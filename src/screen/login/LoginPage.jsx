import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Grid, Input, message, theme, Typography, notification } from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { LoginAPI } from "../../services/Api-handle";
import { useNavigate } from "react-router-dom";
import { runLoginAction } from "../../redux/account/accountSlice";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
const dispatch = useDispatch();

const LoginPage = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, password } = values;
        setIsLoading(true);
        const res = await LoginAPI(username, password);
        setIsLoading(false);
        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(runLoginAction(res.data.user))
            message.success("Everything done");
            navigate("/")
        } else {
            notification.error({
                message: "Something went wrongs",
                description: "Failed action, try again..!",
            })
        }
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px"
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: token.marginXL
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
        },
        text: {
            color: token.colorTextSecondary
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
            textAlign: "center"
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
                        <path
                            d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
                            fill="white"
                        />
                        <path
                            d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
                            fill="white"
                        />
                        <path
                            d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
                            fill="white"
                        />
                    </svg>

                    <Title style={styles.title}>Sign in</Title>
                    <Text style={styles.text}>
                        Welcome back to Asuaka store! Please enter your details below to
                        sign in.
                    </Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
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
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a style={styles.forgotPassword} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit" loading={isLoading}>
                            Log in
                        </Button>
                        <div style={styles.footer}>
                            <Text style={styles.text}>Don't have an account?</Text>{" "}
                            <Link href="/register">Sign up now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
export default LoginPage;
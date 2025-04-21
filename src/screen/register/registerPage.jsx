import React from 'react';
import { Button, Form, Input, Checkbox, Carousel, Divider } from 'antd';

const RegisterPage = () => {
    const onFinish = values => {
        console.log('Success:', values);

    };
    const contentStyle = {
        height: "500px",
        width: "800px",
        textAlign: 'center'
    };
    return (
        <div className='register-form' style={{ display: "flex", padding: "10px", alignItems: "center", margin: "150px 100px" }}>
            <div style={{ width: "50%", }} >
                <Carousel autoplay>
                    <div>
                        <img style={contentStyle} src="https://essential-japan.com/wp-content/uploads/2025/04/lycoris-recoil-cafe-1024x573.webp" alt="" />
                    </div>
                    <div>
                        <img style={contentStyle} src="https://essential-japan.com/wp-content/uploads/2025/04/lycoris-recoil-cafe-1024x573.webp" alt="" />
                    </div>
                    <div>
                        <img style={contentStyle} src="https://essential-japan.com/wp-content/uploads/2025/04/lycoris-recoil-cafe-1024x573.webp" alt="" />
                    </div>
                    <div>
                        <img style={contentStyle} src="https://essential-japan.com/wp-content/uploads/2025/04/lycoris-recoil-cafe-1024x573.webp" alt="" />
                    </div>
                </Carousel>

            </div>
            <div style={{ margin: "auto" }}>
                <div style={{ width: "50%" }}>
                    <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản mới</h3>
                    <Divider />
                    <Form
                        name="register"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: "700px", margin: 'auto' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Fullname"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )

}
export default RegisterPage;
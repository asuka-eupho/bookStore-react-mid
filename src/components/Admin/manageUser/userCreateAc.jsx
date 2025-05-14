import {
    Form, Button, Modal, Input, Select, InputNumber,
    message,
    notification
} from 'antd';
import { createUserAPI } from '../../../services/Api-handle';
const UserCreateAc = (props) => {
    const { setOpenCreateUser, openCreateUser } = props;
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const onFinish = async (values) => {
        const { fullName, email, password, phone, role } = values;
        const res = await createUserAPI(fullName, email, password, phone, role);
        if (res && res.data) {
            message.success("Create user successfully");
            form.resetFields();
            setOpenCreateUser(false);
            await props.refetchUser();
        } else {
            notification.error({
                message: "Create user failed",
                description: res.message,
            });
        }
    }
    return (
        <Modal
            title="Create new user"
            okText="Create"
            width={700}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={openCreateUser}
            onOk={() => form.submit()}
            onCancel={() => setOpenCreateUser(false)}
        >
            <Form
                form={form}
                variant={variant || 'filled'}
                style={{ maxWidth: 600 }}
                initialValues={{ variant: 'filled' }}
                onFinish={onFinish}
            >

                <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    extra="Password needs to be at least 6 characters."
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    label="InputNumber"
                    name="phone"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Address/location"
                    name="address"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input.TextArea />
                </Form.Item>


                <Form.Item
                    label="Role action"
                    name="role"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Select options={[
                        { value: 'USER', label: 'user role' },
                        { value: 'ADMIN', label: 'Admin role' },
                        { value: 'KOL', label: 'KOL/KOC' },
                        { value: 'SUPLLIER', label: 'Supplier', disabled: true },
                    ]} />
                </Form.Item>

            </Form>
        </Modal>
    );
}
export default UserCreateAc;
import { Divider, Form, Input, Modal, notification } from "antd"
import { useEffect } from "react"
import { callUpdateUser } from "../../../services/Api-handle"

const UserUpdate = (props) => {
    const [form] = Form.useForm()
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate, refetchUser } = props

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])
    const onFinish = async (values) => {
        const { _id, fullName, email, phone } = values
        // call api update user
        const res = await callUpdateUser(_id, fullName, phone)
        if (res && res.data) {
            setOpenModalUpdate(false)
            await props.refetchUser()
            notification.success({
                message: "Cập nhật thành công",
                placement: "topRight"
            })
        } else {
            notification.error({
                message: "Cập nhật thất bại",
                placement: "topRight"
            })
        }
    }
    return (
        <>
            <Modal
                title="Cập nhật người dùng"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                // initialValues={dataUpdate}
                >
                    <Form.Item

                        labelCol={{ span: 24 }}
                        label="Id"
                        name="_id"

                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}
export default UserUpdate
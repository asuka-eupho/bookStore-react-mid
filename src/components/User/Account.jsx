import { Modal, Tabs } from "antd"

const AccountMange = () => {
    const items = [
        {
            key: 'info',
            label: `Cập nhật thông tin`,
            children: <UserInfo />
        },
        {
            key: 'password',
            label: `Đổi mật khẩu`,
            children: <ChangePassword />,
        },

    ];

    return (
        <Modal
            title="Quản lý tài khoản"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            width={"60vw"}
        >
            <Tabs
                defaultActiveKey="info"
                items={items}
            />
        </Modal>
    )
}
export default AccountMange
import { Drawer, Badge, Descriptions } from "antd";
import moment from 'moment';

const UserShowDetail = (props) => {
    const { setDataDetail, dataDetail, openViewDetail, setOpenViewDetail } = props;
    const onClose = () => {
        setOpenViewDetail(false);
        setDataDetail(null)
    };

    return (
        <>
            <Drawer
                title="More Info User"
                closable={{ 'aria-label': 'Close Button' }}
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions title="User Info" bordered column={3}>
                    <Descriptions.Item label="Id user">{dataDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone number">{dataDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Name">{dataDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={3}>
                        <Badge status="processing" text={dataDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Time created">{moment(dataDetail?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="Time updated">{moment(dataDetail?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}
export default UserShowDetail;
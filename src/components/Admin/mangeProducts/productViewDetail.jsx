import { Badge, Descriptions, Divider, Drawer, Modal, Upload, Image } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant-date";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
const ProductViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataDetail, setDataDetail } = props;
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [fileList, setFileList] = React.useState([]);

    useEffect(() => {
        let imgThumnail = {}, imgSlider = [];
        if (dataDetail?.thumbnail) {
            imgThumnail = {
                uid: uuidv4(),
                name: dataDetail.thumbnail,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`,

            }
        }
        if (dataDetail?.slider && dataDetail.slider.length > 0) {
            dataDetail.slider.map((item, index) => {
                imgSlider.push({
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                })
            })
        }
        setFileList([imgThumnail, ...imgSlider]);
    }, [dataDetail]);
    const handleCancel = () => setPreviewOpen(false);
    const onClose = () => {
        setOpenViewDetail(false);
        setDataDetail(null);
    }


    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin Book"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail?.price ?? 0)}</Descriptions.Item>

                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" text={dataDetail?.category} />
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(dataDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left" > Ảnh Books </Divider>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >{fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />

                )}


            </Drawer>

        </>
    )
}
export default ProductViewDetail;
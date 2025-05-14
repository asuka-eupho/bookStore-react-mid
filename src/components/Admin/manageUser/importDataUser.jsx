import { Descriptions, Modal, notification, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx';
import { useState } from "react";
import { createBulkUserAPI } from "../../../services/Api-handle";
import templateFile from './dataForm/template.xlsx?url';
const { Dragger } = Upload

const UserDataImport = (props) => {
    const { openImportUser, setOpenImportUser, refetchUser } = props;
    const [dataExcel, setDataExcel] = useState([]);
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const handleSubmit = async () => {
        const data = dataExcel.map((item) => {
            item.password = '123456'
            return item
        })
        const res = await createBulkUserAPI(data);
        if (res && res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
                message: "Upload thành công",
            })
            setOpenImportUser(false);
            setDataExcel([]);
            props.refetchUser();
        } else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra",
            })
        }
    }
    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList.length > 0 && info.fileList) {
                    const file = info.fileList[0].originFileObj;
                    const read = new FileReader();
                    read.onload = (e) => {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.Sheets[workbook.SheetNames[0]];
                        const jsonData = XLSX.utils.sheet_to_json(sheetName,
                            {
                                header: ["fullName", "email", "phone"],
                                range: 1,
                            });
                        if (jsonData.length > 0 && jsonData) {
                            setDataExcel(jsonData);

                        }
                    }
                    read.readAsArrayBuffer(file)
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <>
            <Modal title="Import data user"
                width={"50vw"}
                open={openImportUser}
                onOk={() => handleSubmit()}
                onCancel={() => {
                    setOpenImportUser(false)
                    setDataExcel([])
                }}
                okText="Import data"
                okButtonProps={{
                    disabled: dataExcel.length < 1,
                }}
                //do not close when click outside
                maskClosable={false}
            >
                <Dragger {...propsUpload} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx  &nbsp; or
                        <a onClick={e => e.stopPropagation()} href={templateFile} download>Download Sample File</a>
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table
                        dataSource={dataExcel}
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={[
                            { dataIndex: 'fullName', title: 'Tên hiển thị' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Số điện thoại' },
                        ]}
                    />
                </div>
            </Modal>
        </>)

}
export default UserDataImport;
import React, { useEffect, useState } from 'react';
import {
    Col, Row, Space, Table, Form, Button, Modal, Input, Select, InputNumber,
    notification,
    Popconfirm
} from 'antd';
import SearchFilter from './inputSearch';
import { callDeleteUser, FetchAndFilterUser } from '../../../services/Api-handle';
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import UserShowDetail from './userViewDetail';
import UserCreateAc from './userCreateAc';
import UserDataImport from './importDataUser';
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from '../../../utils/constant-date';
import UserUpdate from './userUpdateModal';



const style = { margin: "10px" };
const UserTable = () => {
    const [total, setTotal] = useState();
    const [current, setCurrent] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [sortQuery, setSortQuery] = useState("");
    const [filter, setFilter] = useState("");
    const [dataDetail, setDataDetail] = useState(null);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [openCreateUser, setOpenCreateUser] = useState(false);
    const [openImportUser, setOpenImportUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);


    // data table
    const columns = [
        {
            title: 'Id User',
            key: '_id',
            render: (text, record, index) => {
                return (
                    <a href="#" onClick={() => {
                        setDataDetail(record);
                        setOpenViewDetail(true);
                    }}>
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
            sorter: true,
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{moment(record.updatedAt).format(FORMAT_DATE_DISPLAY)}</>
                )
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
                    </>
                )
            }
        },
    ];

    useEffect(() => {
        refetchUser();
    }, [current, pageSize, sortQuery, filter])
    const refetchUser = async () => {
        let queryString = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            queryString += `&${filter}`;
        }
        if (sortQuery) {
            queryString += `&${sortQuery}`;
        }
        const res = await FetchAndFilterUser(queryString);
        if (res && res.data) {
            setDataList(res.data.result);
            setTotal(res.data.meta.total);
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        // sort filter
        if (sorter && sorter.field) {
            const sort = sorter.order === "ascend" ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`;
            setSortQuery(sort);
        }
    }
    const handleSearch = (query) => {
        if (query) {
            setFilter(query);
        }
    }
    const handleExport = () => {
        if (dataList.length > 0) {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(dataList);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "dataUserExport.csv");
        }
    }
    const handleDeleteUser = async (id) => {
        const res = await callDeleteUser(id);
        if (res && res.data) {
            notification.success({
                message: "Xóa user thành công",
                description: res.data.message,
            })
            refetchUser();
        } else {
            notification.error({
                message: "Xóa user thất bại",
                description: res.message,
            })
        }
    }
    // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <h3 style={{ color: "green", fontSize: "20px" }}>Table List Users</h3>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => {
                            handleExport();
                        }}
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => {
                            setOpenImportUser(true);
                        }}
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary" onClick={() => {
                            setOpenCreateUser(true);
                        }}
                    >Thêm mới</Button>
                    <Button type='ghost' onClick={
                        () => {
                            setFilter("");
                            setSortQuery("");

                        }}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    return (
        <>
            <Row gutter={24}>
                <Col span={16} className='gutter-row' >
                    <div style={{ margin: "10px" }}>
                        <SearchFilter handleSearch={handleSearch} />
                    </div>
                </Col>
                <Col span={24} className="gutter-row">
                    <Table
                        title={renderHeader}
                        style={style}
                        columns={columns}
                        rowKey="_id"
                        dataSource={dataList}
                        onChange={onChange}
                        pagination={{
                            current: current,
                            pageSize: pageSize,
                            total: total,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            showSizeChanger: true
                        }} />
                </Col>
            </Row>
            <UserShowDetail setDataDetail={setDataDetail}
                dataDetail={dataDetail}
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail} />
            <UserCreateAc openCreateUser={openCreateUser}
                setOpenCreateUser={setOpenCreateUser}
                refetchUser={refetchUser} />
            <UserDataImport openImportUser={openImportUser} setOpenImportUser={setOpenImportUser} refetchUser={refetchUser} />
            <UserUpdate dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                refetchUser={refetchUser} />
        </>


    )
}
export default UserTable;
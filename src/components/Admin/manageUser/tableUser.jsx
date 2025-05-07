import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Table, Tag, Button } from 'antd';
import SearchFilter from './inputSearch';
import { FetchAndFilterUser } from '../../../services/Api-handle';
import { CloudDownloadOutlined, CloudUploadOutlined, DeleteTwoTone, ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';

const columns = [
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
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit + {record.name}</a>
                <a>Delete -</a>
            </Space>
        ),
    },
];

const style = { margin: "10px" };
const UserTable = () => {
    const [total, setTotal] = useState();
    const [current, setCurrent] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [sortQuery, setSortQuery] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        refetchUser();
    }, [current, pageSize, sortQuery, filter])
    const refetchUser = async () => {
        let queryString = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            queryString += filter;
        }
        if (sortQuery) {
            queryString += sortQuery;
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
    // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <h3 style={{ color: "green", fontSize: "20px" }}>Table List Users</h3>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
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
                    pagination={{ current: current, pageSize: pageSize, total: total, showSizeChanger: true }} />
            </Col>
        </Row>

    )
}
export default UserTable;
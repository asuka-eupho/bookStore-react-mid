import { Button, Col, message, notification, Popconfirm, Row, Table } from "antd";
import { use, useEffect, useState } from "react";
import { DeleteBookAPI, FetchAndFilterBook } from "../../../services/Api-handle";
import SearchFilterProduct from "./productSearch";
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant-date";
import BookModalCreate from "./productModalCreate";
import ProductViewDetail from "./productViewDetail";
import BookModalUpdate from "./productModalUpdate";

const style = { margin: "10px" };
const AdminTableProduct = () => {
    const [listBooks, setListBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [sortQuery, setSortQuery] = useState("");
    const [filter, setFilter] = useState("");

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);
    // data table

    useEffect(() => {
        refetchData();
    }, [pageSize, current, sortQuery, filter]);
    const refetchData = async () => {
        let queryString = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            queryString += filter;
        }
        if (sortQuery) {
            queryString += sortQuery;
        }
        const res = await FetchAndFilterBook(queryString);
        if (res && res.data) {
            setListBooks(res.data.result);
            setTotal(res.data.meta.total);
        }
    }
    const columns = [
        {
            title: 'Id Product',
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
            title: 'Name Product',
            dataIndex: 'mainText',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: true
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            sorter: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)}</>
                )
            }

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
                            title={"Xác nhận xóa"}
                            description={"Bạn có chắc chắn muốn xóa sp này ?"}
                            onConfirm={() => handleDeleteBook(record._id)}
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
    const onChange = (pagination, filters, sorter) => {
        if (pagination.current !== current && pagination) {
            setCurrent(pagination.current);
        }
        if (pagination.pageSize !== pageSize && pagination) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            const sort = sorter.order === "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(sort);
        }
    }
    const handleSearch = (query) => {
        setFilter(query);
    }
    const handleDeleteBook = async (id) => {
        const res = await DeleteBookAPI(id);
        if (res && res.data) {
            message.success('Xóa book thành công');
            refetchData();
        } else {
            notification.error({
                message: "Xóa sản phẩm không thành công",
                description: res.data.message
            })
        }
    }
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <h3 style={{ color: "green", fontSize: "20px" }}>Table Products</h3>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => {
                            handleExport();
                        }}
                    >Export</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary" onClick={() => {
                            setOpenModalCreate(true);
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
                        <SearchFilterProduct handleSearch={handleSearch} />
                    </div>
                </Col>
                <Col span={24} className="gutter-row">
                    <Table
                        title={renderHeader}
                        style={style}
                        columns={columns}
                        rowKey="_id"
                        dataSource={listBooks}
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
            <BookModalCreate openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate} refetchData={refetchData} />
            <ProductViewDetail openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail} />
            <BookModalUpdate dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                refetchData={refetchData} />
        </>
    )
}
export default AdminTableProduct;
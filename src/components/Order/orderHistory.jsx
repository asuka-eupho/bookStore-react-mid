import { Table, Tag } from "antd"
import { useEffect, useState } from "react";
import { callOrderHistoryAPI } from "../../services/Api-handle";
import ReactJson from 'react-json-view'
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../utils/constant-date";

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const res = await callOrderHistoryAPI();
            if (res && res.data) {
                setOrderHistory(res.data)
            }
        }
        fetchOrderHistory()
    }, [])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Thời gian ',
            dataIndex: 'createdAt',
            render: (item, record, index) => {
                return moment(item).format(FORMAT_DATE_DISPLAY)
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (item, record, index) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item)
            }
        },
        {
            title: 'Trạng thái',
            render: (_, { tags }) => (
                <Tag color={"green"}>
                    Thành công
                </Tag>
            )
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: (_, record) => (
                <ReactJson
                    src={record.detail}
                    name={"Chi tiết đơn mua"}
                    collapsed={true}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                />
            ),
        },
    ];

    return (
        <div>
            <h2 style={{ margin: "20px 0" }}>Lịch sử mua hàng của bạn:</h2>
            <Table dataSource={orderHistory} columns={columns} pagination={false} />
        </div>
    )
}
export default OrderHistory
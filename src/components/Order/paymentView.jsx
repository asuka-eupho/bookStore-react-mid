import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, message, notification, Radio, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callPlaceOrderAPI } from "../../services/Api-handle";
import { doReloadOrderAction } from "../../redux/order/orderSlice";

const PaymentView = (props) => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.carts)
    const user = useSelector(state => state.account.user)

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map(item => {
                sum += item.quantity * item.detail.price;
            })
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts]);


    const onFinish = async (values) => {
        setIsSubmit(true)
        const dataOrders = carts.map((item) => {
            return {
                bookName: item.detail.mainText,
                quantity: item.quantity,
                _id: item._id
            }
        })
        const data = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            detail: dataOrders
        }
        const res = await callPlaceOrderAPI(data)
        if (res && res.data) {
            message.success("Đơn hàng đặt thành công !!")
            dispatch(doReloadOrderAction());
            props.setCurrentStep(2)
        } else {
            notification.error({
                message: "Something wrongs..",
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (
        <>
            <div style={{ background: '#efefef', padding: "20px 0" }}>
                <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <h2>Tiến hành thanh toán</h2>
                    <Row gutter={[20, 20]}>
                        <Col md={16} sm={24} xs={24}>
                            {carts?.map((item, index) => {
                                const currentBookPrice = item?.detail.price ?? 0;
                                return (
                                    <div className="order-book">
                                        <div className="book-content">
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} alt="" />
                                            <div className="title">{item?.detail?.mainText}</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice)}
                                            </div>

                                        </div>
                                        <div className="action">
                                            <div className="quantity">
                                                Số lượng: {item?.quantity}
                                            </div>
                                            <div className='sum'>
                                                Tổng:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice * (item?.quantity ?? 0))}
                                            </div>
                                            <DeleteTwoTone
                                                style={{ cursor: "pointer" }}
                                                onClick={() => dispatch(doDeleteItem({ _id: item._id }))}
                                                twoToneColor="#eb2f96"
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                        </Col>
                        <Col md={8} sm={24}>
                            <div className="order-sum">
                                <Form
                                    onFinish={onFinish}
                                    form={form}
                                >
                                    <Form.Item
                                        style={{ margin: 0 }}
                                        labelCol={{ span: 24 }}
                                        label="Tên người nhận"
                                        name="name"
                                        initialValue={user?.fullName}
                                        rules={[{ required: true, message: 'Tên người nhận không được để trống!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ margin: 0 }}
                                        labelCol={{ span: 24 }}
                                        label="Số điện thoại"
                                        name="phone"
                                        initialValue={user?.phone}
                                        rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        style={{ margin: 0 }}
                                        labelCol={{ span: 24 }}
                                        label="Địa chỉ"
                                        name="address"
                                        rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
                                    >
                                        <TextArea
                                            autoFocus
                                            rows={4}
                                        />
                                    </Form.Item>
                                </Form>
                                <div className='info'>
                                    <div className='method'>
                                        <div>  Hình thức thanh toán</div>
                                        <Radio checked>Thanh toán khi nhận hàng</Radio>
                                    </div>
                                </div>

                                <Divider style={{ margin: "5px 0" }} />
                                <div className='calculate'>
                                    <span> Tổng tiền</span>
                                    <span className='sum-final'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                                    </span>
                                </div>
                                <Divider style={{ margin: "5px 0" }} />
                                <button
                                    onClick={() => form.submit()}
                                    disabled={isSubmit}
                                >
                                    {isSubmit && <span><LoadingOutlined /> &nbsp;</span>}
                                    Đặt Hàng ({carts?.length ?? 0})
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default PaymentView
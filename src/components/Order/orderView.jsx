import { DeleteTwoTone } from "@ant-design/icons"
import { Col, Divider, Empty, InputNumber, Row } from "antd"
import { useEffect, useState } from "react"
import "./orderView.scss"
import { useDispatch, useSelector } from "react-redux"
import { doDeleteItem, doUpdateItem } from "../../redux/order/orderSlice"

const OrderView = (props) => {
    const carts = useSelector(state => state.order.carts)
    const dispatch = useDispatch();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map(item => { sum += item.quantity * item.detail.price })
            setTotalPrice(sum)
        } else {
            setTotalPrice(0)
        }
    }, [carts])
    const handleChangeInput = (quantity, book) => {
        if (!quantity || quantity < 1) return;
        if (!isNaN(quantity)) {
            dispatch(doUpdateItem({ quantity: quantity, detail: book, _id: book._id }))
        }
    }
    return (
        <>
            <div style={{ background: '#efefef', padding: "20px 0" }}>
                <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <h2>Tiến hành thanh toán</h2>
                    <Row gutter={[20, 20]}>

                        <Col md={18} sm={24} xs={24}>

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
                                                <InputNumber onChange={(value) => handleChangeInput(value, item)} value={item.quantity} />
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
                            {carts?.length === 0 &&
                                <div className='order-book-empty'>
                                    <Empty
                                        description={"Không có sản phẩm trong giỏ hàng"}
                                    />
                                </div>
                            }
                        </Col>
                        <Col md={6} sm={24}>
                            <div className='order-sum'>
                                <div className='calculate'>
                                    <span>Tạm tính</span>
                                    <span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                                    </span>
                                </div>
                                <Divider style={{ margin: "10px 0" }} />
                                <div className='calculate'>
                                    <span> Tổng tiền</span>
                                    <span className='sum-final'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                                    </span>
                                </div>
                                <Divider style={{ margin: "10px 0" }} />
                                <button
                                    disabled={carts.length === 0}
                                    onClick={() => props.setCurrentStep(1)}
                                >Mua Hàng ({carts?.length ?? 0})</button>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default OrderView
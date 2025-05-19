import { Button, Result, Steps } from "antd";
import { useState } from "react";
import OrderView from "../../components/Order/orderView";
import PaymentView from "../../components/Order/paymentView";
import { SmileOutlined } from "@ant-design/icons";
import "./orderPage.scss"
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate()
    return (
        <div>
            <div className="order-container">
                <div className="order-steps">
                    <Steps
                        size="small"
                        current={currentStep}
                        status={"finish"}
                        items={[
                            {
                                title: 'Đơn hàng',
                            },
                            {
                                title: 'Đặt hàng',
                            },
                            {
                                title: 'Thanh toán',
                            },
                        ]}
                    />
                </div>
                {currentStep === 0 &&
                    <OrderView setCurrentStep={setCurrentStep} />
                }
                {currentStep === 1 &&
                    <PaymentView setCurrentStep={setCurrentStep} />
                }
                {currentStep === 2 &&
                    <Result icon={<SmileOutlined />}
                        title="Đơn hàng đã được đặt thành công!"
                        extra={
                            <div>
                                <Button type="link" onClick={() => navigate("/history")}>Xem lịch sử</Button>
                                <div style={{ margin: 5 }}></div>
                                <Button type="primary" onClick={() => navigate("/")}>Quay ve Trang Chủ</Button>
                            </div>
                        }
                    />
                }
            </div>
        </div>
    )
}
export default OrderPage;
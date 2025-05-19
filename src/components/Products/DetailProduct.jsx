import "./Bookpage.scss";
import ModalGallery from "../../components/Products/ModalGalleryImage";
import { Button, Col, Divider, message, Rate, Row } from "antd";
import ImageGallery from "react-image-gallery";
import { BsCartPlus } from 'react-icons/bs';
import React, { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import LoaderContent from "./LoaderContent";
import { useDispatch, useSelector } from 'react-redux';
import { doAddItemAction } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router";

const ViewDetailProduct = (props) => {
    const refGallery = React.useRef(null);
    const [openModalDetail, setOpenModalDetail] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);

    const { bookData } = props;

    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const dispatch = useDispatch();

    const images = bookData?.items ?? [];

    const handleClickImage = () => {
        setOpenModalDetail(true);
        setCurrentIndex(refGallery?.current.getCurrentIndex());
    }
    const handleRenewQuantity = (val) => {
        if (val === 'minus') {
            if (currentQuantity - 1 <= 0) return;
            setCurrentQuantity(currentQuantity - 1)
        }
        if (val === 'plus') {
            if (currentQuantity === +bookData.quantity) return;
            setCurrentQuantity(currentQuantity + 1);
        }
    }
    const handleChangeInput = (value) => {
        if (!isNaN(value)) {
            if (+value > 0 && +value < +bookData.quantity) {
                setCurrentQuantity(+value);
            }
        }
    }
    const handleAddCart = (quantity, book) => {
        if (!isAuthenticated) {
            navigate("/login");
            message.info("Please login before add product")
            return
        }
        dispatch(doAddItemAction({ quantity, _id: book._id, detail: book }))
    }
    return (
        <div style={{ padding: "10px", backgroundColor: "#f0f2f5" }}>
            <div className="view-detail-book" style={{ maxWidth: 1440, margin: "0 auto" }}>
                {bookData && bookData?._id ?
                    <>
                        <Row gutter={[20, 20]}>
                            <Col md={12} xs={0} className="gutter-row" style={{ maxWidth: `calc(100vh - 300px)` }}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showThumbnails={true}
                                    showPlayButton={false}
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    slideOnThumbnailOver={true}
                                    onClick={() => { handleClickImage() }}
                                />
                            </Col>
                            <Col md={12} xs={24} className="gutter-row">
                                <Col md={0} sm={24} xs={24} className="gutter-row">
                                    <ImageGallery
                                        ref={refGallery}
                                        items={images}
                                        showPlayButton={false} //hide play button
                                        showFullscreenButton={false} //hide fullscreen button
                                        renderLeftNav={() => <></>} //left arrow === <> </>
                                        renderRightNav={() => <></>}//right arrow === <> </>
                                        showThumbnails={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className='author'>{`Tác giả: ${bookData?.author}`} </div>
                                    <div className='title'>{`${bookData?.mainText}`}</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <Divider type="vertical" />
                                        <span className='sold'>{`${bookData?.sold}`}</span>
                                    </div>
                                    <div className='price'>
                                        <span className="currency">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bookData?.price ?? 0)}
                                        </span>
                                    </div>
                                    <div className='delivery'>
                                        <div>
                                            <span className='left-side'>Vận chuyển</span>
                                            <span className='right-side'>Miễn phí vận chuyển</span>
                                        </div>
                                    </div>

                                    <div className='quantity'>
                                        <span className='left-side'>Số lượng</span>
                                        <span className='right-side'>
                                            <button onClick={() => handleRenewQuantity("minus")} ><MinusOutlined /></button>
                                            <input onChange={(e) => handleChangeInput(e.target.value)} value={currentQuantity} />
                                            <button onClick={() => handleRenewQuantity("plus")}><PlusOutlined /></button>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button className='cart' onClick={() => handleAddCart(currentQuantity, bookData)} >
                                            <BsCartPlus className='icon-cart' />
                                            <span >Thêm vào giỏ hàng</span>
                                        </button>
                                        <button className='now'>Mua ngay</button>
                                    </div>

                                </Col>
                            </Col>
                        </Row>
                        <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                            <Col span={24}>
                                <div className='description'>
                                    <span className='title'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis explicabo asperiores veritatis! Esse, quam perferendis sed est, reprehenderit beatae accusantium laboriosam aliquid, consectetur vel possimus explicabo consequatur provident libero porro?
                                        Eligendi voluptatem quia corporis voluptas assumenda iusto dolorem ex? Id omnis vero tempore maxime delectus, optio possimus esse, velit, perferendis excepturi architecto dolorem sunt ab sed dolorum rerum aliquid nemo.
                                        Delectus fuga doloremque illo repudiandae dolore in voluptates rerum vero iure repellat est assumenda debitis vel non sunt, omnis nam voluptas incidunt, fugit iste necessitatibus vitae voluptatibus! Officiis, animi quis!
                                        Quaerat reiciendis laboriosam voluptatum, tempore aperiam me? Laboriosam pariatur recusandae temporibus quae non maxime, cupiditate delectus reprehenderit dolorum! Earum, quam dicta.
                                        Illum dicta, delectus accusantium iure consectetur minus asper nisi rerum alias totam reprehenderit animi deleniti vero maiores. Provident, asperiores eius?
                                        Hic reprehenderit expedita eos porro facilis quod veniam quam rerum sequi, ipsa nam molestias nemo quasi delectus voluptatum, magni natus adipisci et a non iusto temporibus. Suscipit quod iste laudantium.</span>
                                    <div className='content'>
                                        {bookData?.description}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                    : <LoaderContent />
                }
            </div>
            <ModalGallery
                isOpen={openModalDetail}
                setIsOpen={setOpenModalDetail}
                items={images}
                title={bookData?.mainText}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                refGallery={refGallery}
            />
        </div>
    )
}
export default ViewDetailProduct;
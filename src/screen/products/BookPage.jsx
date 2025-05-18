import { useLocation } from "react-router-dom";
import ViewDetailProduct from "../../components/Products/DetailProduct";
import { fetchBookByIdAPI } from "../../services/Api-handle";
import React, { useEffect } from "react";

const BookPage = () => {
    const [bookData, setBookData] = React.useState([]);
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id
    useEffect(() => {
        const fetchBookById = async () => {
            const res = await fetchBookByIdAPI(id);
            if (res && res.data) {
                let rawData = res.data;;
                rawData.items = getFormImage(res.data);

                setTimeout(() => {
                    setBookData(rawData);
                }, 1000);
            }
        }
        fetchBookById();
    }, [id]);

    const getFormImage = (data) => {
        const images = [];
        if (data.thumbnail) {
            images.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            })
        }
        if (data.slider) {
            data?.slider.map((item) => {
                images.push({
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image"
                })
            }
            )
        }
        return images;
    }
    return (
        <>
            <ViewDetailProduct bookData={bookData} />
        </>
    )

}
export default BookPage;
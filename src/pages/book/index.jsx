import { useLocation } from "react-router-dom";
import BookDeatail from "../../components/Book/BookDetail";
import { getBookByID } from "../../services/api";
import { useEffect, useState } from "react";

const BookPage = () => {
    const [data, setData] = useState([])
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id")// get book id
    useEffect(()=> {
        getBookById()
    },[id])
    const getBookById = async () => {
        const res =  await getBookByID(id);
        if(res && res.data) {
            let raw = res.data;
            // process data
            raw.items = getImages(raw)
            setTimeout(() =>{
                setData(raw)
            }, 3000)
        }
    }
    const getImages = (raw) => {
        const images = []
        if(raw.thumbnail) {
            images.push({
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail:`${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            })
        }
        if(raw.slider) {
            raw?.slider?.map(item => {
                images.push({
                    original:  `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image"
                })
            })
        }
        return images
    }
    return (
        <>
           <BookDeatail data={data}/>
        </>
    )
}

export default BookPage;
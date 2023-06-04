import { useLocation } from "react-router-dom";



const BookPage = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id")// get book id
    return (
        <>
            Book deatail page: {id}
        </>
    )
}

export default BookPage;
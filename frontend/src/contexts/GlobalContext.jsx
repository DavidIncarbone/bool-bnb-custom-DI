import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "apartments/";

const initialNewApartment = {
    category: 0,
    city: "",
    address: "",
    description: "",
    roomsNumber: 0,
    bedsNumber: 0,
    bathroomsNumber: 0,
    squareMeters: 0,
    imageUrl: "",
    likes: 0
}

const initialNewComment = {
    name: "",
    text: "",
    entryDate: "",
    daysOfStay: 0,
    vote: 0,
}



const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [apartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState();
    const [apartmentData, setApartmentData] = useState(initialNewApartment);
    const [commentData, setCommentData] = useState(initialNewComment);
    const [likes, setLikes] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchHomePage, setSearchHomePage] = useState("")
    const [minRooms, setNumRooms] = useState(0);
    const [minBeds, setNumBeds] = useState(0);
    const [category, setCategory] = useState(0);
    const initialData = { type: "", message: "" };
    const [alertData, setAlertData] = useState(initialData);
    const [searchFormData, setSearchFormData] = useState({});
    const [isHomePage, setIsHomePage] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.href.includes("advanced-research"))
            setIsHomePage(false)
        else
            setIsHomePage(true);

    }, [window.location.href])

    function getApartments() {
        axios.get(apiUrl + endpoint)
            .then((res) => {
                setIsLoading(true);
                setApartments(res.data.items);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
            .finally(() => {
                setIsLoading(false);
                console.log("Done");
            })
    }


    function resetPageScroll() {
        // isHomePage ? 500 : 0;
        // window.scrollTo(
        //     {
        //         top: isHomePage,
        //         behavior: "instant"
        //     }
        // )
    }


    async function addLike(slug) {
        return axios.patch(apiUrl + endpoint + slug)
            .then((res) => {
                //console.log(res.data.likes);
                return res.data.likes;
            })
            .catch((err) => {
                console.log("Error: ", err)
                return null;
            })
    }

    function handlePageChange(page) {
        setPage(page);
        isHomePage ? 500 : 0;
        window.scrollTo(
            {
                top: isHomePage,
                behavior: "smooth"
            }
        )
    }




    const data = {
        apartments, setApartments, setApartment, apartment, apartmentData, setApartmentData, initialNewApartment,
        search, setSearch, minRooms, setNumRooms, minBeds, setNumBeds, category, setCategory, searchFormData, setSearchFormData,
        initialNewComment, commentData, setCommentData, getApartments, addLike, likes, setLikes,
        isLoading, alertData, setAlertData, setIsLoading, page, setPage, numPages, setNumPages,
        handlePageChange, resetPageScroll, searchHomePage, setSearchHomePage

    }

    return <GlobalContext.Provider value={data}>
        {children}
    </GlobalContext.Provider>
}

function useGlobalContext() {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("Use global context is not inside the context provider GlobalProvider");
    }
    return context;
}

export { GlobalProvider, useGlobalContext };
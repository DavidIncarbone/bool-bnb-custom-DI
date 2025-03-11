import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const apiURL = import.meta.env.VITE_APIURL;
const endpoint = "apartments/";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const { setIsLoading, isHomePage } = useGlobalContext()

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchFormData, setSearchFormData] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || 0,
        minRooms: searchParams.get('minRooms') || 0,
        minBeds: searchParams.get('minBeds') || 0
    });
    const [tempFormData, setTempFormData] = useState(searchFormData);
    const [isPaginationFlag, setIsPaginationFlag] = useState(false);
    const [filteredApi, setFilteredApi] = useState([]);
    const [apartmentsCount, setApartmentsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [homeApartments, setHomeApartments] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        setIsLoading(true);
        const params = {};
        if (window.location.pathname === "/advanced-research") {
            if (searchFormData.search) {
                params.search = searchFormData.search;
            }
            if (searchFormData.minRooms > 0) {
                params.minRooms = searchFormData.minRooms;
            }
            if (searchFormData.minBeds > 0) {
                params.minBeds = searchFormData.minBeds;
            }
            if (searchFormData.category > 0) {
                params.category = searchFormData.category;
            }
        }
        const queryParams = new URLSearchParams(params).toString();

        if (queryParams) {
            window.history.pushState({}, '', `?${queryParams}`);
        } else {
            return;
        }

        fetchApi();

    }, [searchFormData, page]);

    useEffect(() => {
        const params = {
            search: searchParams.get('search') || '',
            category: searchParams.get('category') || '',
            minRooms: searchParams.get('minRooms') || '',
            minBeds: searchParams.get('minBeds') || ''
        };
        setSearchFormData(params);
        fetchApi();
    }, [searchParams]);
    const params = {
        page,
        search: searchFormData.search || undefined,
        minRooms: searchFormData.minRooms > 0 ? searchFormData.minRooms : undefined,
        minBeds: searchFormData.minBeds > 0 ? searchFormData.minBeds : undefined,
        category: searchFormData.category > 0 ? searchFormData.category : undefined,
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTempFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setSearchFormData(tempFormData);
        setPage(1);
        updateURL(tempFormData);
    };

    const updateURL = (newParams) => {
        const params = {
            search: newParams.search,
            category: newParams.category,
            minRooms: newParams.minRooms,
            minBeds: newParams.minBeds,
        };

        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== '')
        );

        setSearchParams(filteredParams);
    };

    function getHomeApartments() {
        const searchValue = typeof search?.searchParam === "string" ? search.searchParam.trim() : "";

        // Crea un oggetto params che contiene sia la ricerca che la pagina
        const params = {
            page,
            ...(searchValue && { searchParam: searchValue }), // Aggiungi il parametro 'searchParam dubai' solo se ha un valore
        };

        axios.get(`${apiURL}${endpoint}homepage`, { params })
            .then((res) => {
                setNumPages(Math.ceil(res.data.count / res.data.limit));
                setHomeApartments(res.data.items);
                setApartmentsCount(res.data.count);
                res?.data?.count <= 8 ? setIsPaginationFlag(true) : setIsPaginationFlag(false);

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            });
    }

    const fetchApi = () => {
        axios.get(`${apiURL}${endpoint}`, { params })
            .then((res) => {
                setFilteredApi(res.data.items);
                console.log("boh", filteredApi);
                setNumPages(Math.ceil(res.data.count / res.data.limit));
                setApartmentsCount(res.data.count);
                res?.data?.count <= 8 ? setIsPaginationFlag(true) : setIsPaginationFlag(false);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            });
    };
    function handleFilteredPageChange(page) {
        setPage(page);
        isHomePage ? 500 : 0;
        window.scrollTo({
            top: isHomePage,
            behavior: "smooth"
        });
    }

    const searchData = {
        handleOnChange, fetchApi, handleOnSubmit, searchParams, setSearchParams, searchFormData, setSearchFormData, tempFormData, setTempFormData,
        isPaginationFlag, filteredApi, apartmentsCount, page, numPages, handleFilteredPageChange, params, homeApartments, search, setSearch, getHomeApartments,
        useSearchParams
    }
    return <SearchContext.Provider value={searchData}>
        {children}
    </SearchContext.Provider>

}

function useSearchContext() {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("Use global context is not inside the context provider SearchProvider");
    }
    return context;
}


export { SearchProvider, useSearchContext };

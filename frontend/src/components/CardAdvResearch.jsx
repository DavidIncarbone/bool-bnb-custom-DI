import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import { FaMapMarkerAlt, FaCity, FaBed, FaBath, FaRulerCombined, FaHome, FaDoorOpen } from "react-icons/fa";
import style from "../styles/Card.module.css";

const imgPath = import.meta.env.VITE_IMGPATH;
const apiUrl = import.meta.env.VITE_APIURL;
const endpoint = "/apartments/";

export default function CardAdvResearch({ apartment, addLike }) {
    const slug = apartment.slug;
    const [likes, setLikes] = useState(apartment.likes);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    // Funzione per ottenere le categorie
    useEffect(() => {
        axios.get(apiUrl + endpoint + "/categories")
            .then((res) => {
                setCategories(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(apartment)
    }, []);

    // Trova la categoria dell'appartamento
    useEffect(() => {
        if (categories.length > 0) {
            const foundCategory = categories.find(cat => cat.id == apartment.id_category);
            setCategory(foundCategory);
        }
    }, [categories, apartment.id_category]);

    // Componente riutilizzabile per ogni riga di informazioni
    const InfoRow = ({ icon: Icon, text }) => (
        <div className="d-flex align-items-center">
            <p className={`text-break d-flex flex-nowrap align-items-center ${style.infoText} fw-normal`}>
                &nbsp;&nbsp;&nbsp;<Icon fill="#8B2635" size="20" className="me-3" />&nbsp;{text}
            </p>
        </div>
    );

    return (
        <div className={`card d-flex flex-column h-100 justify-content-between position-relative ${style["card-background"]}`} key={slug}>

            <NavLink to={`/apartment/${slug}`} className="text-decoration-none text-dark">
                <img className={`${style.picture} card-img-top`} src={`${imgPath}${apartment.img}`} alt={apartment.description} />
                <div className={`card-body h-100 ${style["card-header"]}`}>
                    <h5 className="fw-bold card-title">{apartment.description.length > 25 ? apartment.description.substring(0, 24) + ("...") : apartment.description}</h5>
                    <div className="">
                        <p className="fw-bold card-text text-break "><FaCity fill="#8B2635" size="20" className="me-3" />&nbsp;{apartment.city}</p>
                    </div>
                    <div className=" my-2 ">
                        <p className=" fw-bold card-text text-break "><FaMapMarkerAlt fill="#8B2635" size="20" className="me-3" />&nbsp;{apartment.address.length > 25 ? apartment.address.substring(0, 24) + ("...") : apartment.address} </p>
                    </div>
                    <div className=" my-2 ">
                        <p className=" card-text text-break "><FaHome fill="#8B2635" size="20" className="me-3" />&nbsp;{apartment.category_name}</p>
                    </div>
                    <div className=" my-2 ">
                        <p className="card-text text-break "><FaDoorOpen fill="#8B2635" size="20" className="me-3" />Rooms:&nbsp;{apartment.rooms_number}</p>
                    </div>
                    <div className=" my-2 ">
                        <p className="card-text text-break "><FaBed fill="#8B2635" size="20" className="me-3" />Beds:&nbsp;{apartment.beds_number}</p>
                    </div>
                </div>
            </NavLink>
            <div>
                <button
                    className="btn btn-danger text-light d-flex align-items-center justify-content-center"
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    id={style.likeButton}
                    onClick={() => {
                        addLike(slug).then(() => {
                            setLikes(likes + 1);
                        });
                    }}
                >
                    <span className="d-inline-block me-2">&#9829;</span>
                    <span className="ml-3 d-inline-block align-self-center">{likes}</span>
                </button>
            </div>
        </div >
    );
}
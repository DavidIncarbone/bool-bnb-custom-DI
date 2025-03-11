import { useState } from "react"
import { NavLink } from "react-router"
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import style from "../styles/Card.module.css"

const imgPath = import.meta.env.VITE_IMGPATH

export default function Card({ apartment, addLike }) {
    const slug = apartment.slug
    const [likes, setLikes] = useState(apartment.likes)


    return (
        <div className={`card d-flex flex-column h-100 justify-content-between position-relative ${style["card-background"]}`} key={slug}>
            <NavLink to={`/apartment/${slug}`} className="text-decoration-none text-dark">
                <img className={`${style.picture} card-img-top`} src={`${imgPath}${apartment.img}`} alt={apartment.description} />
                <div className={`card-body ${style["card-header"]}`}>
                    <h5 className="card-title">{apartment.description}</h5>
                    <div className="d-flex align-items-center my-2">
                        <p className="fw-bold card-text text-break d-flex flex-nowrap align-items-center"><FaMapMarkerAlt fill="#8B2635" size="20" className="me-3" />&nbsp;{apartment.address}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="fw-bold text-break d-flex flex-nowrap align-items-center"><FaCity fill="#8B2635" size="20" className="me-3" />&nbsp;{apartment.city}</p>
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
    )
}
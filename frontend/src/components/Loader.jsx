import { FaSpinner } from "react-icons/fa";
import style from "../styles/Loader.module.css"

export default function Loader() {
    return (
        <div className={`${style.loader} d-flex flex-direction-column justify-content-center align-items-center text-center`}>
            <FaSpinner className={`${style.loading} text-white`} icon="spinner" />
        </div>
    )
}

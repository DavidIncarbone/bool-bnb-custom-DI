import styles from '../styles/NotFound.module.css'; // Modulo CSS personalizzato
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className={styles.errorPage}>
            <div className={`${styles.overlay} d-flex align-items-center justify-content-center`}>
                <div className={`${styles.content} w-100 d-flex flex-column align-items-center justify-content-center`}>
                    <div className=' w-50 mx-5' style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10vh" }}>
                        <h1 className="display-4">Oops! Something went wrong.</h1>
                        <p className="lead">We couldn't find the page you're looking for. Please try again later or return to the homepage.</p>
                    </div>
                    <Link className="btn custom-button mt-5 link-btn" to={"/"}>Back to Homepage</Link>
                </div>
            </div>
        </div>
    );
}






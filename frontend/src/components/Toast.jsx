import React from "react";
import styles from "../styles/Toast.module.css"; // Personalizza con i tuoi stili

const Toast = ({ message, type, onClose }) => {
    return (
        <div
            className={`toast ${styles.toast} ${type === "success" ? "bg-success" : "bg-danger"}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-body">
                {message}
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
    );
};

export default Toast;

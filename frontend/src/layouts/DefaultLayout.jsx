import { Outlet } from "react-router";
import { useGlobalContext } from "../contexts/GlobalContext";

import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { ToastContainer, toast } from 'react-toastify';


export default function DefaultLayout() {

    return (
        <>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={3000} // Durata del toast (3 secondi)
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
                rtl={false}
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}





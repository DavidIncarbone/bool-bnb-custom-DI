import { NavLink } from "react-router"
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe, FaYoutube, FaLinkedin } from "react-icons/fa"
import { useGlobalContext } from "../contexts/GlobalContext"

export default function Footer() {



    function resetPageScroll() {

        window.scrollTo(
            {
                top: 0,
                behavior: "instant"
            }
        )
    }

    return (
        <footer className="bg-dark text-light text-lg-start ">
            <div className="container p-4 d-flex flex-column justify-content-center">
                <div id="footer-links" className="row container-small justify-content-center">
                    <div className="col-6 col-md-3 mb-4 mb-md-2 flex-grow-1">
                        <h5 className="text-uppercase text-white">Company</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="text-light">About</a>
                            </li>
                            <a href="#" className="text-light">Why Us</a>
                            <li>
                                <a href="#" className="text-light">Suggestions</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Policies</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 mb-4 mb-md-2">
                        <h5 className="text-uppercase text-white">Navigation</h5>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink to={"/"} onClick={resetPageScroll} className="text-light">Homepage</NavLink>
                            </li>
                            <li>
                                <NavLink to={"advanced-research"} onClick={resetPageScroll} className="text-light">Search an apartment</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/post-apartment"} onClick={resetPageScroll} className="text-light">Post your announcement</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 mb-4 mb-md-2">
                        <h5 className="text-uppercase text-white">Hosting</h5>

                        <ul className="list-unstyled mb-0">
                            <li>
                                <a href="#" className="text-light">Hospitality</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Home Safety</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Responsable Hosting</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Why Host</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 mb-4 mb-md-2">
                        <h5 className="text-uppercase mb-0 text-white">Support</h5>

                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="text-light">Report a problem</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">Cancellation Options</a>
                            </li>
                            <li>
                                <a href="#" className="text-light">FAQ</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="text-center p-3 d-flex justify-content-center mt-4">
                    <p>© 2025 Copyright:&nbsp;</p>
                    <NavLink className="text-light" to={"/"}><p>Bool B&amp;B</p></NavLink>
                </div>
                <div className="w-50 w-sm-100 align-self-center">
                    <ul className="nav col-md-4 justify-content-around list-unstyled d-flex py-3 w-100 flex-wrap gap-3">
                        <li className="ms-3"><a href="#" ><FaFacebook style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaInstagram style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaTwitter style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaGlobe style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaYoutube style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                        <li className="ms-3"><a href="#"><FaLinkedin style={{ width: "25px", height: "25px", fill: "white" }} /></a></li>
                    </ul>
                </div>
            </div>

        </footer >
    )
}
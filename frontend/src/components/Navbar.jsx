import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
        window.scrollTo(
            {
                top: 0,
                behavior: "instant"
            }
        )
    };

    function handleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="w-100 text-uppercase" id="id-navbar">
            <nav className="container-fluid navbar navbar-expand-lg d-navbar-dark h-100 p-0">
                <div className="w-100 g-0">
                    <button
                        className="navbar-toggler mx-3"
                        type="button"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                        onClick={handleMenu}
                    >
                        <span className="navbar-toggler-icon" style={{ backgroudColor: 'red' }}></span>
                    </button>
                    <div
                        className={`w-100 collapse navbar-collapse my-2  ${isOpen ? "show" : ""}`}
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0 fw-bold text-shadow-1 align-items-center">

                            <li className="nav-item">
                                <NavLink to="/" className="nav-link text-decoration-none navlink-hover custom-link" onClick={handleToggle}>
                                    <img style={{ width: "40px", height: "40px" }} src="/img/logoMenu.png" alt="Logo" className="logo" />
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link text-decoration-none navlink-hover custom-link"
                                    style={({ isActive }) => (isActive ? { color: "#8B2635" } : { color: "white" })}
                                    onClick={handleToggle}
                                    end
                                >
                                    Homepage
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/advanced-research"
                                    className="nav-link text-decoration-none navlink-hover custom-link"
                                    style={({ isActive }) => (isActive ? { color: "#8B2635" } : { color: "white" })}
                                    onClick={handleToggle}
                                    end
                                >
                                    Search an apartment
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/post-apartment"
                                    className="nav-link text-decoration-none navlink-hover custom-link"
                                    style={({ isActive }) => (isActive ? { color: "#8B2635" } : { color: "white" })}
                                    onClick={handleToggle}
                                    end
                                >
                                    Post your announcement
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
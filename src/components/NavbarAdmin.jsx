import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/headerxp.png";
import { logout } from "../actions/auth";
import { AdminContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

export const NavbarAdmin = () => {
    const { dispatchAuth } = useContext(AuthContext);
    const { dispatchAdmin } = useContext(AdminContext);
    const { dispatchUser } = useContext(UserContext);
    const handleLogout = () => {
        dispatchAuth(logout());
        dispatchAdmin(logout());
        dispatchUser(logout());
        localStorage.clear();
    }

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "#a384ff" }}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width={40} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo03"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Usuarios
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/lists">
                                Listas
                            </Link>
                        </li>

                        <button className="ms-2 btn btn-danger" onClick={handleLogout}>Salir</button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

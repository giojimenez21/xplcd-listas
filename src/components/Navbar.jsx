import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_blanco.png";
import { logout } from "../actions/auth";
import { AdminContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

export const Navbar = () => {
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
            style={{ backgroundColor: "#4F3E8C" }}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width={80} />
                </Link>
                <button className="navbar_btn_logout" onClick={handleLogout}>
                    Salir
                </button>
            </div>
        </nav>
    );
};

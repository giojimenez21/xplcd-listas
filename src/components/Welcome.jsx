import React, { useContext } from "react";
import logo from "../../assets/headerxp.png";
import { AuthContext } from "../context/AuthContext";

export const Welcome = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div className="row">
            <div className="col-12">
                <div className="mt-2 text-center">
                    <h1>Bienvenido {auth?.username}</h1>
                    <img src={logo} alt="Logo" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

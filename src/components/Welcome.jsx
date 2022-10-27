import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Welcome = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div className="row">
            <div className="col-12">
                <div className="mt-2 text-center">
                    <h1 className="welcome_title mt-5">
                        Bienvenido {auth?.username}
                    </h1>
                    {auth.role === "ADMIN" && (
                        <Link className="welcome_btn shadow my-5" to={"/users"}>
                            <span>Usuarios</span>
                        </Link>
                    )}
                    <Link className="welcome_btn shadow my-5" to={"/lists"}>
                        <span>Listas</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

import React, { useContext } from "react";
import logo from "../../assets/headerxp.png";
import { login, startLogin } from "../actions/auth";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

export const Login = () => {
    const { dispatchAuth } = useContext(AuthContext);
    const [formValues, handleChange] = useForm({
        username: "",
        password: "",
    });

    const handleLogin = async(e) => {
        e.preventDefault();
        const res = await startLogin(formValues);
        if(res){
            dispatchAuth(login(res));
        }
    };

    return (
        <div
            className="h-100 d-flex align-items-center"
            style={{ backgroundColor: "#7b5bda" }}
        >
            <div className="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 shadow rounded p-4 bg-white">
                <form onSubmit={handleLogin}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="img-fluid d-block mx-auto"
                        width={180}
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Usuario"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        autoComplete="off"
                        required={true}
                    />
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Contraseña"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        required={true}
                    />
                    <button
                        className="btn btn-primary d-block mx-auto"
                        type="submit"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

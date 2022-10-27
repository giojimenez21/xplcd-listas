import React, { useContext } from "react";
import logo from "../../assets/headerxp.png";
import iconUser from '../../assets/icono_user.png';
import iconPassword from '../../assets/icono_password.png';
import { login, startLogin } from "../actions/auth";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

export const Login = () => {
    const { dispatchAuth } = useContext(AuthContext);
    const [formValues, handleChange] = useForm({
        username: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await startLogin(formValues);
        res && dispatchAuth(login(res));
    };

    return (
        <div className="h-100 d-flex align-items-center">
            <div className="col-12 col-md-7 col-lg-6 col-xl-4 mx-auto shadow-lg px-5 pb-4 bg-white">
                <img
                    src={logo}
                    alt="Logo"
                    className="img-fluid d-block mx-auto"
                    width={(360 / 3) * 2}
                />
                <h2 className="text-center fw-bold mb-0">Iniciar sesión</h2>
                <div className="login__hr mb-5" />
                <form onSubmit={handleLogin}>
                    <div className="login__input_container position-relative mb-5">
                        <img
                            src={iconUser}
                            className="position-absolute top-50 end-0 translate-middle-y img-fluid"
                            width={70}
                        />
                        <input
                            type="text"
                            className="login__input ps-3 pe-5 py-1"
                            placeholder="Usuario"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                    <div className="login__input_container position-relative mb-5">
                        <img
                            src={iconPassword}
                            className="position-absolute top-50 end-0 translate-middle-y img-fluid me-2"
                            width={50}
                        />
                        <input
                            type="password"
                            className="login__input ps-3 pe-5 py-1"
                            placeholder="Contraseña"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <button
                        className="login__btn d-block mx-auto mb-xxl-5"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

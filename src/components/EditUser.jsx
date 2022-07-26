import Swal from "sweetalert2";
import { child, get, ref } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { editUser, startEditUser } from "../actions/admin";
import { database } from "../config/firebaseConfig";
import { AdminContext } from "../context/AdminContext";
import { existUser } from "../helpers/existUser";
import { useForm } from "../hooks/useForm";
import { roles } from "../types/roles";

export const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [auxUsername, setAuxUsername] = useState();
    const { dispatchAdmin } = useContext(AdminContext);
    const [formValues, handleChange] = useForm({
        username: "",
        password: "",
        role: "",
    });

    const handleEdit = async (e) => {
        e.preventDefault();
        
        if(formValues.password.length !== 0 && formValues.password.length < 6) {
            Swal.fire("Error", "La contraseña debe ser mayor a 6 caracteres.", "error");
            return;
        }

        if(auxUsername !== formValues.username){
            const respExist = await existUser(formValues.username);
            if(respExist){
                Swal.fire("Error", "Ya existe un usuario con ese nombre.", "error");
                return;
            }
        }

        if (formValues.password.length === 0) {
            if (startEditUser(formValues, id)) {
                dispatchAdmin(editUser({ id, username: formValues.username, role: formValues.role }));
                Swal.fire("Usuario editado","El usuario fue editado correctamente.","success")
                    .then(() => {
                        navigate("/users");
                    });
                return;
            }
        }

        if (startEditUser(formValues, id)) {
            dispatchAdmin(editUser({ id, username: formValues.username, role: formValues.role }));
            Swal.fire("Usuario editado","El usuario fue editado correctamente.","success")
                .then(() => {
                    navigate("/users");
                });
            return;
        }        
    };

    const getUserEdit = async () => {
        const dbRef = ref(database);
        const response = await get(child(dbRef, `users/${id}`));
        if (response.exists()) {
            const userExist = response.val();
            setAuxUsername(userExist.username);
            formValues.username = userExist.username;
            formValues.role = userExist.role;
            setLoading(false);
        }else{
            setLoading(false);
            Swal.fire("Error", "No puede mostrarse la pagina que esta solicitando", "error")
                .then(() => navigate('/users'));
        }
    };

    useEffect(() => {
        getUserEdit();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-2">
            <h1 className="text-center">Editar Usuario</h1>
            <div className="row">
                <div className="col-12 col-md-4 offset-md-4">
                    <form>
                        <input
                            className="form-control mt-2"
                            type="text"
                            name="username"
                            placeholder="Usuario"
                            autoComplete="off"
                            value={formValues.username}
                            onChange={handleChange}
                            required={true}
                        />
                        <input
                            className="form-control mt-2"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formValues.password}
                            onChange={handleChange}
                            required={true}
                            minLength="6"
                        />
                        <select
                            name="role"
                            className="form-select mt-2"
                            onChange={handleChange}
                            required={true}
                            defaultValue={formValues.role}
                        >
                            <option value=""></option>
                            {roles.map((rol, i) => {
                                return (
                                    <option key={i} value={rol.type}>
                                        {rol.type}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            className="btn btn-primary mt-2 d-block mx-auto"
                            type="submit"
                            onClick={handleEdit}
                        >
                            Editar Usuario
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

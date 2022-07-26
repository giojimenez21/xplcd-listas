import { child, get, ref } from "firebase/database";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createUser, startCreateUser } from "../actions/admin";
import { database } from "../config/firebaseConfig";
import { AdminContext } from "../context/AdminContext";
import { useForm } from "../hooks/useForm";
import { roles } from "../types/roles";

export const NewUser = () => {
    const navigate = useNavigate();
    const { dispatchAdmin } = useContext(AdminContext);
    const [formValues, handleChange] = useForm({
        username: "",
        password: "",
        role: ""
    });

    const handleCreate = async(e) => {
        e.preventDefault();
        const dbRef = ref(database);
        const response = await get(child(dbRef, `users/${formValues.username}`));
        if(Object.values(formValues).includes("")) {
            Swal.fire("Error", "Debe completar todos los campos", "error");
            return;
        }

        if(response.exists()){
            Swal.fire("Error", "Ya existe un usuario con ese nombre", "error");
            return;
        }
        
        if(formValues.password.length < 6){
            Swal.fire("Error", "La contraseña debe ser mayor de 6 caracteres", "error");
            return;
        }
        
        if(startCreateUser(formValues)){
            dispatchAdmin(createUser({
                username: formValues.username,
                role: formValues.role
            }));
            Swal.fire('Usuario creado','El usuario fue creado correctamente.','success')
                .then(() => {
                    navigate("/users");
                })
        }
        
    }

    return (
        <div className="mt-2">
            <h1 className="text-center">Nuevo Usuario</h1>
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
                        <select name="role" className="form-select mt-2" onChange={handleChange} required={true}>
                            <option value=""></option>
                            {
                                roles.map((rol,i) => {
                                    return (
                                        <option key={i} value={rol.type}>{ rol.type }</option>
                                    )
                                })
                            }
                        </select>
                        <button
                            className="btn btn-primary mt-2 d-block mx-auto"
                            type="submit"
                            onClick={handleCreate}
                        >
                            Crear Usuario
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, lockUser, startGetUsers, startLockUser, startUnlockUser, unlockUser } from "../actions/admin";
import { AdminContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";

export const Users = () => {
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const { admin, dispatchAdmin } = useContext(AdminContext);

    const handleLock = async(user) => {
        if(user.available) {
            const response = await startLockUser(user.id);
            if(response) {
                dispatchAdmin(lockUser(user.id));
            }
            
        }else{
            const response = await startUnlockUser(user.id);
            if(response) {
                dispatchAdmin(unlockUser(user.id));
            }
        }     
    }
    
    const getAllUsers = async () => {
        const users = await startGetUsers();
        dispatchAdmin(getUsers(users));
        setLoading(false);
    };

    useEffect(() => {
        getAllUsers();
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
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3">
                    <div className="d-flex justify-content-between mb-2">
                        <h1 className="text-center">Usuarios</h1>
                        <Link
                            to="/newUser"
                            className="text-light btn btn-danger fs-3"
                        >
                            +
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th>Editar</th>
                                    <th>Bloquear acceso</th>
                                </tr>
                                {admin?.users
                                    .filter((u) => u.username !== auth.username)
                                    .map((u, i) => {
                                        return (
                                            <tr key={i} className={`${!u.available && "bg-danger text-white"}`}>
                                                <td>{u.username}</td>
                                                <td>{u.role}</td>
                                                <td className="text-center">
                                                    <button className="btn">
                                                        <Link to={`/editUser/${u.id}`}>
                                                            <i className="fa-solid fa-user-pen" />
                                                        </Link>
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button className={`btn ${u.available ? "text-danger" : "text-white"}`} onClick={() => handleLock(u)}>
                                                        <i className="fa-solid fa-user-slash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

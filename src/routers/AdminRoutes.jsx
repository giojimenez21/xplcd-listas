import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { EditUser } from "../components/EditUser";
import { Lists } from "../components/Lists";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { NewUser } from "../components/NewUser";
import { Users } from "../components/Users";
import { Welcome } from "../components/Welcome";

export const AdminRoutes = () => {
    return (
        <>
            <NavbarAdmin />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/newUser" element={<NewUser/>} />
                    <Route path="/editUser/:id" element={<EditUser/>} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};

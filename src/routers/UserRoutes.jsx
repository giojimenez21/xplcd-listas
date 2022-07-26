import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import { Lists } from "../components/Lists";
import { NavbarUser } from "../components/NavbarUser";
import { Welcome } from "../components/Welcome";

export const UserRoutes = () => {
    return (
        <>
            <NavbarUser /> 
            <div className="container">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};

import React from "react";
import { Navigate } from "react-router-dom";


export const PublicRoute = ({ children, user }) => {
    console.log('publico');
    return (!user?.logged)
        ? children
        : <Navigate to="/"/>
};



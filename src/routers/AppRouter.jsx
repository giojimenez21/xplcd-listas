import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { login } from "../actions/auth";
import { Login } from "../components/Login";
import { AuthContext } from "../context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    const { user, dispatchAuth } = useContext(AuthContext);
    useEffect(() => {
        const userData = localStorage.getItem("auth");
        if (userData) {
            dispatchAuth(login(JSON.parse(userData)));
        }
    }, []);

    return (
        <div className="vh-100">
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/login"
                        element={
                            <PublicRoute user={user}>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        exact
                        path="/*"
                        element={
                            <PrivateRoute user={user}>
                                <h1>hola</h1>
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    );
};

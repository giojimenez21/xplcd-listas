import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../components/Login";
import { AuthContext } from "../context/AuthContext";
import { AdminRoutes } from "./AdminRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="vh-100">
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute user={auth}>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    {
                        auth.role === "ADMIN"
                        ?
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute user={auth}>
                                    <AdminRoutes />
                                </PrivateRoute>
                            }
                        />
                        :
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute user={auth}>
                                    <UserRoutes />
                                </PrivateRoute>
                            }
                        />
                    }
                </Routes>
            </Router>
        </div>
    );
};

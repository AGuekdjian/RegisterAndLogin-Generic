import React from "react";
import { Routes, Route, BrowserRouter, Navigate, } from 'react-router-dom'
import PublicLayout from "../components/layout/public/PublicLayout";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import Private from "../components/layout/private/Private";
import Error404 from "../components/Error404/Error404";
import { Register } from "../components/user/register/Register";
import { Login } from "../components/user/login/Login";
import { AuthProvider } from "../context/AuthProvider";
import { Logout } from "../components/user/Logout";

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="/presupuesto" element={<PrivateLayout />}>
                        <Route path="logout" element={<Logout />} />
                    </Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
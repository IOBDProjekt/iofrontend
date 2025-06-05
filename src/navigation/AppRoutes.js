import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Landing from "../pages/Landing";
import ResetPassword from "../pages/ResetPassword";
import RegisterShelter from "../assets/RegisterForm/ShelterRegister"
import PetDetail from "../assets/Pet/PetDetail";
import Advices from "../pages/Advices";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/advice" element={<VetAdvice />} />
            <Route path="/register-shelter" element={<RegisterShelter />} />
            <Route path="/advice" element={<Advices />} />
            <Route path="/pet/:id" element={<PetDetail />} />
        </Routes>
    );
}
export default AppRoutes;

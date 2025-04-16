import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import LandingPage from '../pages/LandingPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Nowa Landing Page jako strona główna */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            {/* ... inne route'y jeśli są */}
        </Routes>
    );
};

export default AppRoutes;
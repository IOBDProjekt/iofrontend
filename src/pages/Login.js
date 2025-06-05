import React, { useState } from "react";
import { useRedirect } from "../navigation/RedirectHandlers";
import { useUser } from "../context/UserContext";
import LoginForm from "../assets/LoginForm/LoginForm";
import "../assets/LoginForm/Login.css";

export default function Login() {
    const { loginUser } = useUser();
    const handleRedirectToProfile = useRedirect("/profile");

    const successLogin = (userData) => {
        console.log(userData);
        handleRedirectToProfile();
        loginUser(userData);
    };

    return (
        <div className="login-wrapper">
            <LoginForm successLogin={successLogin} />
        </div>
    );
}

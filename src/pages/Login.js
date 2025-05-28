import React, { useState } from "react";
import { TextField, Button, Link, Alert } from "@mui/material";
import { useRedirect } from "../navigation/RedirectHandlers";
import { useUser } from "../context/UserContext";
import LoginForm from "../assets/LoginForm/LoginForm";
import "../assets/LoginForm/Login.css";

export default function Login() {
    const { loginUser } = useUser();
    const handleRedirectToRegister = useRedirect("/register");
    const handleRedirectToProfile = useRedirect("/profile");

    const handleLoginUser = async () => {};

    return (
        <div className="login-wrapper">
            <LoginForm successLogin={handleRedirectToProfile} />
        </div>
    );
}

import React from "react";
import { useRedirect } from "../navigation/RedirectHandlers";
import EmailForm from "../assets/EmailForm/EmailForm";
import { useSearchParams } from "react-router-dom";

import "../assets/RegisterForm/Register.css";
import "../assets/EmailForm/EmailForm.css";
import RegisterForm from "../assets/RegisterForm/RegisterForm";

export default function Register() {
    const handleRedirectToLogin = useRedirect("/login");
    const [searchParams] = useSearchParams();
    const emailToken = searchParams.get("email");

    const showFullRegister = emailToken ? true : false;

    return (
        <div className="register-wrapper">
            {showFullRegister ? (
                <RegisterForm emailToken={emailToken} successRegister={handleRedirectToLogin} />
            ) : (
                <EmailForm submitLink={"/auth/email-verification"} formTitle={"Rejestracja"} buttonText={"Zarejestruj się"} />
            )}
        </div>
    );
}

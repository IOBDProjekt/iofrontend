import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const ResetPasswordForm = ({ resetToken }) => {
    const refPassword = useRef();

    const [formErrors, setFormErrors] = useState([]);
    const [success, setSuccess] = useState([]);

    const handleRestPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/reset-password", {
                token: resetToken,
                password: refPassword.current.value,
            });

            setSuccess((prev) => [response?.data?.message]);
        } catch (error) {
            console.log(error);
            setFormErrors((prev) => [
                ...(error?.response?.data?.messages || [
                        error?.response?.data?.message,
                    ] ||
                    []),
            ]);
        }
    };

    const errorsContainer = (
        <div className="reset-password-form-errors">
            {formErrors.map((fe, index) => (
                <span key={index}>{fe}</span>
            ))}
        </div>
    );

    const successContainer = (
        <div className="reset-password-success">
            {success.map((fe, index) => (
                <span key={index}>{fe}</span>
            ))}
        </div>
    );

    return (
        <div className="reset-password-container">
            <div className="reset-password-hero">
                <div className="reset-password-hero-image"></div>
                <div className="reset-password-hero-cover"></div>
                <div className="reset-password-hero-text">
                    <h1>Szczęśliwe łapki</h1>
                    <p>
                        Tysiące psów i kotów każdego dnia szukają ciepła,
                        bezpieczeństwa i człowieka, któremu będą mogły zaufać.
                        Dzięki naszej aplikacji poznasz ich historie, nawiążesz
                        kontakt ze schroniskiem i dasz im szansę na nowe, lepsze
                        życie u Twojego boku.
                    </p>
                </div>
            </div>
            <form className="reset-password-form">
                <h2>Zmiana hasła</h2>
                {formErrors.length > 0 && errorsContainer}
                {success.length > 0 && successContainer}
                <div className="reset-password-form-inputs">
                    <input
                        type="password"
                        ref={refPassword}
                        placeholder="Nowe hasło"
                    />
                </div>
                <button
                    className="reset-password-form-submit"
                    onClick={handleRestPassword}
                >
                    Zresetuj hasło
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;

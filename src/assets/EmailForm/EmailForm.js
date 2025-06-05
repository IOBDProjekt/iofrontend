import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const EmailForm = ({ formTitle, buttonText, submitLink }) => {
    const refEmail = useRef();

    const [formErrors, setFormErrors] = useState([]);
    const [success, setSuccess] = useState([]);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(submitLink, {
                email: refEmail.current.value,
            });

            setSuccess((prev) => [response?.data?.message]);
            setFormErrors([]);
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
        <div className="email-form-errors">
            {formErrors.map((fe, index) => (
                <span key={index}>{fe}</span>
            ))}
        </div>
    );

    const successMessage = (
        <div className="email-form-success">
            {success.map((fe, index) => (
                <span key={index}>{fe}</span>
            ))}
        </div>
    );

    return (
        <div className="email-container">
            <div className="email-hero">
                <div className="email-hero-image"></div>
                <div className="email-hero-cover"></div>
                <div className="email-hero-text">
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
            <form className="email-form">
                <h2>{formTitle}</h2>
                {formErrors.length > 0 && errorsContainer}
                {success.length > 0 && successMessage}
                <div className="email-form-inputs">
                    <input
                        type="email"
                        ref={refEmail}
                        placeholder="Wpisz swój adres email"
                    />
                </div>
                <button className="email-form-submit" onClick={handleSendEmail}>
                    {buttonText}
                </button>
                <Link to={"/login"}>
                    Masz już konto zaloguj się do naszej platformy!
                </Link>
                <Link to={"/register-shelter"}>
                    Wyślij wniosek o rejestrację schroniska!
                </Link>
            </form>
        </div>
    );
};

export default EmailForm;

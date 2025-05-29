import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const RegisterForm = ({ emailToken, successRegister }) => {
    const refFirstname = useRef();
    const refLastname = useRef();
    const refCity = useRef();
    const refPassword = useRef();

    const [formErrors, setFormErrors] = useState([]);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchEmailFromToken = async () => {
            try {
                const response = await api.post("/auth/email", {
                    emailToken: emailToken,
                });

                setEmail(response.data.email);
            } catch (error) {}
        };

        fetchEmailFromToken();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", {
                email: email,
                password: refPassword.current.value,
                city: refCity.current.value,
                firstname: refFirstname.current.value,
                lastname: refLastname.current.value,
            });

            successRegister();
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
        <div className="login-form-errors">
            {formErrors.map((fe, index) => (
                <span key={index}>{fe}</span>
            ))}
        </div>
    );

    return (
        <div className="register-container">
            <div className="register-hero">
                <div className="register-hero-image"></div>
                <div className="register-hero-cover"></div>
                <div className="register-hero-text">
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
            <form className="register-form">
                <h2>Rejestracja</h2>
                {formErrors.length > 0 && errorsContainer}
                <div className="register-form-inputs">
                    <input
                        className="input-read-only"
                        type="email"
                        readOnly={true}
                        placeholder="Adres email"
                        value={email}
                    />
                    <input ref={refFirstname} placeholder="Twoje imię" />
                    <input ref={refLastname} placeholder="Twoje nazwisko" />
                    <input ref={refCity} placeholder="Miasto" />
                    <input
                        type="password"
                        ref={refPassword}
                        placeholder="Hasło"
                    />
                </div>
                <button
                    className="register-form-submit"
                    onClick={handleRegister}
                >
                    Wyślij
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;

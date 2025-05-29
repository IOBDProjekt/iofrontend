import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const LoginForm = ({ successLogin }) => {
    const refEmail = useRef();
    const refPassword = useRef();

    const [formErrors, setFormErrors] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", {
                email: refEmail.current.value,
                password: refPassword.current.value,
            });

            localStorage.setItem("authToken", response.data["token"]);
            successLogin();
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
        <div className="login-container">
            <div className="login-hero">
                <div className="login-hero-image"></div>
                <div className="login-hero-cover"></div>
                <div className="login-hero-text">
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
            <form className="login-form">
                <h2>Zaloguj się</h2>
                {formErrors.length > 0 && errorsContainer}
                <div className="login-form-inputs">
                    <input
                        type="email"
                        ref={refEmail}
                        placeholder="Wpisz swój adres email"
                    />
                    <input
                        type="password"
                        ref={refPassword}
                        placeholder="Wpisz swoje hasło"
                    />
                </div>
                <button className="login-form-submit" onClick={handleLogin}>
                    Zaloguj się
                </button>
                <Link to={"/register"}>
                    Nie masz konta? Dołącz do naszej platformy!
                </Link>
                <Link to={"/reset-password"}>
                    Zapomniałeś hasła? Zresetuj hasło
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;

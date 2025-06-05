import "./Navbar.css";
import { useUser } from "../context/UserContext";
import { useRedirect } from "../navigation/RedirectHandlers";

export default function Navbar() {
    const handleRedirectToLanding = useRedirect("/");
    const handleRedirectToLogin = useRedirect("/login");
    const handleRedirectToRegister = useRedirect("/register");
    const handleRedirectToHome = useRedirect("/home");
    const handleRedirectToAdvice = useRedirect("/advice");
    const handleRedirectToProfile = useRedirect("/profile");

    const { logoutUser, isUserLoggedIn } = useUser();

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem("authToken");
        handleRedirectToLanding();
    };

    const userStatus = isUserLoggedIn();

    return (
        <header className={"app-bar"}>
            <h2 className={"nav-title"} onClick={handleRedirectToLanding}>
                Szczęśliwe Łapki
            </h2>
            <div className={"nav-buttons-container"}>
                {!userStatus && (
                    <button className={"nav-button"} onClick={handleRedirectToLogin}>
                        Zaloguj się
                    </button>
                )}
                {!userStatus && (
                    <button className={"nav-button"} onClick={handleRedirectToRegister}>
                        Rejestracja
                    </button>
                )}
                {userStatus && (
                    <button className={"nav-button"} onClick={handleRedirectToHome}>
                        Ogłoszenia
                    </button>
                )}
                {userStatus && (
                    <button className={"nav-button"} onClick={handleRedirectToAdvice}>
                        Porady
                    </button>
                )}
                {userStatus && (
                    <button className={"nav-button"} onClick={handleRedirectToProfile}>
                        Profil
                    </button>
                )}
                {userStatus && (
                    <button className={"nav-button"} onClick={handleLogout}>
                        Wyloguj się
                    </button>
                )}
            </div>
        </header>
    );
}

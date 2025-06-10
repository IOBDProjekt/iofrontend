import "./Navbar.css";
import { useUser } from "../context/UserContext";
import { useRedirect } from "../navigation/RedirectHandlers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleRedirectToLanding = useRedirect("/");
  const handleRedirectToLogin = useRedirect("/login");
  const handleRedirectToRegister = useRedirect("/register");
  const handleRedirectToHome = useRedirect("/home");
  const handleRedirectToAdvice = useRedirect("/advice");
  const handleRedirectToProfile = useRedirect("/profile");

  const { logoutUser, isUserLoggedIn, setRefreshFavourites } = useUser();
  const [favourites, setFavourites] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("authToken");
    handleRedirectToLanding();
  };

  const userStatus = isUserLoggedIn();

  useEffect(() => {
    const fetchFavourites = () => {
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "/favourite", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          const uniqueFavourites = Array.from(
            new Map(
              res.data.favourites.map((pet) => [pet.id_pet, pet])
            ).values()
          );
          setFavourites(uniqueFavourites);
        })
        .catch((err) => console.error("Błąd ładowania ulubionych:", err));
    };

    if (userStatus) {
      fetchFavourites();
      setRefreshFavourites(() => fetchFavourites); // <-- to powoduje późniejszy refresh
    }
  }, [userStatus, setRefreshFavourites]);
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
        {userStatus && (
          <div className="favourites-dropdown">
            <button
              className="nav-button"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Ulubione
            </button>
            {dropdownOpen && (
              <div className="favourites-list">
                {favourites.length === 0 ? (
                  <div className="favourites-item">Brak ulubionych</div>
                ) : (
                  favourites.map((fav) => (
                    <div
                      key={fav.id_pet}
                      className="favourites-item"
                      onClick={() => navigate(`/pet/${fav.id_pet}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {fav.name || `Zwierzak #${fav.id_pet}`}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

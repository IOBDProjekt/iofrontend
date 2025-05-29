import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ViewPetModal from "../pages/HomePageFunctionalities/ViewPetModal"; // Upewnij się, że ścieżka jest poprawna
import { useUser } from "../context/UserContext";

export default function Navbar({ favorites = [], allPosts = [], toggleFavorite }) {
    const navigate = useNavigate();

    const handleRedirectToAdvice = () => navigate("/advice");
    const handleRedirectToFavoritesPage = () => navigate("/favorites");
    const { user, logoutUser, isUserLoggedIn } = useUser();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElFavorites, setAnchorElFavorites] = React.useState(null);

    const [openFavoriteViewModal, setOpenFavoriteViewModal] = useState(false);
    const [selectedFavoritePet, setSelectedFavoritePet] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenFavoritesMenu = (event) => {
        setAnchorElFavorites(event.currentTarget);
    };

    const handleCloseFavoritesMenu = () => {
        setAnchorElFavorites(null);
    };

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem("authToken");
        navigate("/");
    };

    const favoritePets = allPosts.filter((post) => favorites.includes(post.id));

    const handleFavoriteItemClick = (pet) => {
        setSelectedFavoritePet(pet);
        setOpenFavoriteViewModal(true);
        handleCloseFavoritesMenu();
    };

    const handleCloseFavoriteViewModal = () => {
        setOpenFavoriteViewModal(false);
        setSelectedFavoritePet(null);
    };

    const userStatus = isUserLoggedIn();

    return (
        <header className={"app-bar"}>
            <h2 className={"nav-title"} onClick={() => navigate("/")}>
                Szczęśliwe Łapki
            </h2>
            <div className={"nav-buttons-container"}>
                {!userStatus && (
                    <button className={"nav-button"} onClick={() => navigate("/login")}>
                        Zaloguj się
                    </button>
                )}
                {!userStatus && (
                    <button className={"nav-button"} onClick={() => navigate("/register")}>
                        Rejestracja
                    </button>
                )}
                {userStatus && (
                    <button className={"nav-button"} onClick={() => navigate("/profile")}>
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

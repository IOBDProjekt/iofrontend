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
import ViewPetModal from '../pages/HomePageFunctionalities/ViewPetModal'; // Upewnij się, że ścieżka jest poprawna

export default function Navbar({ favorites = [], allPosts = [], toggleFavorite }) {
    const navigate = useNavigate();

    const handleRedirectToHome = () => navigate("/");
    const handleRedirectToLogin = () => navigate("/login");
    const handleRedirectToRegister = () => navigate("/register");
    const handleRedirectToAdvice = () => navigate("/advice");
    const handleRedirectToFavoritesPage = () => navigate("/favorites");

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

    const favoritePets = allPosts.filter(post => favorites.includes(post.id));

    const handleFavoriteItemClick = (pet) => {
        setSelectedFavoritePet(pet);
        setOpenFavoriteViewModal(true);
        handleCloseFavoritesMenu();
    };

    const handleCloseFavoriteViewModal = () => {
        setOpenFavoriteViewModal(false);
        setSelectedFavoritePet(null);
    };

    return (
        <>
            <AppBar position="static" className="app-bar">
                <Container maxWidth="xl" sx={{ padding: "0 20px" }}>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className="nav-title"
                            onClick={handleRedirectToHome}
                            sx={{ cursor: "pointer" }}
                        >
                            Szczęśliwe Łapki
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className="nav-title-mobile"
                            onClick={handleRedirectToHome}
                            sx={{ cursor: "pointer" }}
                        >
                            Szczęśliwe Łapki
                        </Typography>
                        <Box className="nav-buttons-container">
                            <Button onClick={handleRedirectToAdvice} className="nav-button">
                                Porady
                            </Button>
                            <Button
                                onClick={handleOpenFavoritesMenu}
                                className="nav-button"
                                startIcon={
                                    <Badge badgeContent={favoritePets.length} color="error">
                                        <FavoriteIcon />
                                    </Badge>
                                }
                            >
                                Polubione
                            </Button>
                            <Menu
                                anchorEl={anchorElFavorites}
                                open={Boolean(anchorElFavorites)}
                                onClose={handleCloseFavoritesMenu}
                                PaperProps={{
                                    style: {
                                        maxHeight: '400px',
                                        width: '300px',
                                    },
                                }}
                            >
                                {favoritePets.length > 0 ? (
                                    favoritePets.map(pet => (
                                        <MenuItem
                                            key={pet.id}
                                            onClick={() => handleFavoriteItemClick(pet)}
                                        >
                                            <Typography>{pet.name}</Typography>
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>
                                        <Typography color="text.secondary">Brak ulubionych</Typography>
                                    </MenuItem>
                                )}
                            </Menu>
                            <Button onClick={handleRedirectToLogin} className="nav-button">
                                Login
                            </Button>
                            <Button onClick={handleRedirectToRegister} className="logout-button">
                                Register
                            </Button>
                        </Box>
                        <Box className="nav-buttons-container-mobile">
                            <IconButton
                                size="large"
                                aria-label="navigation menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                className="icon-button"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                className="nav-menu"
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleRedirectToAdvice();
                                        handleCloseNavMenu();
                                    }}
                                    className="menu-item"
                                >
                                    <Typography textAlign="center">Porady</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleRedirectToFavoritesPage(); // Możesz to zostawić lub usunąć jeśli strona /favorites nie będzie już potrzebna
                                        handleCloseNavMenu();
                                    }}
                                    className="menu-item"
                                >
                                    <Badge badgeContent={favoritePets.length} color="error" sx={{ mr: 1 }}>
                                        <FavoriteIcon fontSize="small" />
                                    </Badge>
                                    Polubione
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleRedirectToLogin();
                                        handleCloseNavMenu();
                                    }}
                                    className="menu-item"
                                >
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleRedirectToRegister();
                                        handleCloseNavMenu();
                                    }}
                                    className="menu-item"
                                >
                                    <Typography textAlign="center">Register</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {selectedFavoritePet && (
                <ViewPetModal
                    open={openFavoriteViewModal}
                    onClose={handleCloseFavoriteViewModal}
                    pet={selectedFavoritePet}
                    isFavorite={favorites.includes(selectedFavoritePet.id)}
                    onToggleFavorite={toggleFavorite}
                />
            )}
        </>
    );
}
import React from "react";
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
import { useRedirect } from "../navigation/RedirectHandlers";

export default function Navbar() {
    const handleRedirectToRegister = useRedirect("/register");
    const handleRedirectToLogin = useRedirect("/login");
    const handleRedirectToHome = useRedirect("/");
    const handleRedirectToAdvice = useRedirect("/advice");

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "var(--primary-bg)",
                width: "100%",
                boxShadow: "none",
            }}
        >
            <Container maxWidth="xl" sx={{ padding: "0 20px" }}>
                <Toolbar disableGutters>
                    {/* Desktop Logo/Title */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            cursor: "pointer",
                            "&:hover": { color: "var(--hover-title)" },
                        }}
                        onClick={handleRedirectToHome}
                    >
                        Szczęśliwe Łapki
                    </Typography>

                    {/* Push buttons to the right */}
                    <Box sx={{ ml: "auto", display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Button
                            onClick={handleRedirectToAdvice}
                            sx={{
                                my: 2,
                                color: "white",
                                backgroundColor: "transparent",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                        >
                            Porady
                        </Button>
                        <Button
                            onClick={handleRedirectToLogin}
                            sx={{
                                my: 2,
                                color: "white",
                                backgroundColor: "transparent",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={handleRedirectToRegister}
                            sx={{
                                my: 2,
                                color: "white",
                                backgroundColor: "var(--accent-color)",
                                "&:hover": {
                                    backgroundColor: "#E3A02D",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>

                    {/* Mobile Menu Icon */}
                    <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
                        <IconButton
                            size="large"
                            aria-label="navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "rgba(255, 235, 205, 0.2)",
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleRedirectToAdvice();
                                    handleCloseNavMenu();
                                }}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#FFF8E1",
                                    },
                                }}
                            >
                                <Typography textAlign="center">Porady</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleRedirectToRegister();
                                    handleCloseNavMenu();
                                }}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#FFF8E1",
                                    },
                                }}
                            >
                                <Typography textAlign="center">Register</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleRedirectToLogin();
                                    handleCloseNavMenu();
                                }}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#FFF8E1",
                                    },
                                }}
                            >
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
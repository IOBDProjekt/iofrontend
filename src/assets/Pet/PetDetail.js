import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRedirect } from "../../navigation/RedirectHandlers";
import {
    Container,
    Typography,
    Box,
    Stack,
    Chip,
    CircularProgress,
    CardMedia,
    Button,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getImageUrl } from "../../utils/imageUtils";
import api from "../../api";

import styles from "./Pet.module.css";

export default function PetDetail() {
    const { id } = useParams();
    const goBack = useRedirect(-1);

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        async function fetchPet() {
            try {
                const response = await api.get(`/pet/${id}`);
                const petData = response.data.pets?.[0] || null;
                setPet(petData);
            } catch (err) {
                console.error("Failed to fetch pet data", err);
                setError("Nie udało się pobrać danych zwierzaka");
            } finally {
                setLoading(false);
            }
        }
        fetchPet();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !pet) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" color={error ? "error" : "textPrimary"}>
                    {error || "Nie znaleziono zwierzaka"}
                </Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mt: 2 }}>
                    Wróć
                </Button>
            </Container>
        );
    }

    const { id_image, tags = [] } = pet;

    const handleFavorite = (e) => {
        e.stopPropagation();
        setFavorite((prev) => !prev);
        // TODO: add favorite persistence
        console.log("Favorite toggled:", !favorite);
    };

    return (
        <div className={styles["container"]}>
            <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
                Wróć do listy zwierząt
            </Button>
            <div className={styles["wrapper"]}>
                <div className={styles["image-container"]}>
                    <img className={styles["pet-image"]} src={getImageUrl(id_image)} alt={pet.name} />
                </div>
                <div className={styles["column"]}>
                    <div className={styles["pet-info"]}>
                        <p>{pet["name"]}</p>
                        <p>{pet?.status}</p>
                    </div>
                    <div className={styles["button-group"]}>
                        <button>Wniosek o adopcje</button>
                        <button>Dopytaj o szczegóły</button>
                        <button>Dodaj do ulubionych</button>
                    </div>
                    <div className={styles["shelter-info"]}>
                        <h4 className={styles.title}>Dane schroniska</h4>
                        <div className={styles["contact-item"]}>
                            <strong>Nazwa:</strong> <span>{pet?.shelter?.name || "-"}</span>
                        </div>
                        <div className={styles["contact-item"]}>
                            <strong>Telefon:</strong>{" "}
                            <a href={`tel:${pet?.shelter?.number}`} className={styles.phoneLink}>
                                {pet?.shelter?.number || "-"}
                            </a>
                        </div>
                        <div className={styles["contact-item"]}>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${pet?.shelter?.email}`} className={styles.emailLink}>
                                {pet?.shelter?.email || "-"}
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles["pet-details"]}>cokolwiek</div>
            </div>
        </div>
    );
}

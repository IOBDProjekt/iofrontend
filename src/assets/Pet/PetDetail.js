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

import { useUser } from "../../context/UserContext";

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

                const fetchUser = await api.get("/auth/me");

                const favCheckResult = await api.post("/favourite/check", {
                    id_pet: response.data.pets[0].id_pet,
                    id_user: fetchUser.data["id_user"],
                });

                setFavorite(favCheckResult.data.result);
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

    const handleAddFavourite = async () => {
        try {
            const response = await api.post("/favourite", {
                id_pet: pet["id_pet"],
            });
            setFavorite(true);
        } catch (error) {}
    };

    const handleRemoveFavourite = async () => {
        try {
            const response = await api.delete(`/favourite/${pet["id_pet"]}`);
            setFavorite(false);
        } catch (error) {}
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
                    <div className={styles["info-container"]}>
                        <h4 className={styles.title}>Informacje</h4>
                        <div className={styles["info-item"]}>
                            <strong>Imię:</strong> <span>{pet?.name}</span>
                        </div>
                        <div className={styles["info-item"]}>
                            <strong>Status:</strong> {pet?.status}
                        </div>
                    </div>
                    <div className={styles["button-group"]}>
                        <button>Wniosek o adopcje</button>
                        <button>Dopytaj o szczegóły</button>
                        {favorite === true ? (
                            <button onClick={handleRemoveFavourite}>Usuń z ulubionych</button>
                        ) : (
                            <button onClick={handleAddFavourite}>Dodaj do ulubionych</button>
                        )}
                    </div>
                    <div className={styles["info-container"]}>
                        <h4 className={styles.title}>Dane schroniska</h4>
                        <div className={styles["info-item"]}>
                            <strong>Nazwa:</strong> <span>{pet?.shelter?.name || "-"}</span>
                        </div>
                        <div className={styles["info-item"]}>
                            <strong>Telefon:</strong>{" "}
                            <a href={`tel:${pet?.shelter?.number}`} className={styles.phoneLink}>
                                {pet?.shelter?.number || "-"}
                            </a>
                        </div>
                        <div className={styles["info-item"]}>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${pet?.shelter?.email}`} className={styles.emailLink}>
                                {pet?.shelter?.email || "-"}
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles["pet-details"]}>
                    <div className={styles.attributesBox}>
                        <h3 className={styles.title}>Szczegółowe informacje</h3>
                        <table className={styles.attrTable}>
                            <tbody>
                                <tr>
                                    <th>Imię</th>
                                    <td>{pet.name}</td>
                                </tr>
                                <tr>
                                    <th>Gatunek</th>
                                    <td>{pet.species?.name || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Rasa</th>
                                    <td>{pet.breed?.name || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Wiek</th>
                                    <td>{pet.age}</td>
                                </tr>
                                <tr>
                                    <th>Płeć</th>
                                    <td>{pet.sex}</td>
                                </tr>
                                <tr>
                                    <th>Stan zdrowia</th>
                                    <td>{pet.condition}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <span
                                            className={`${styles.status} ${
                                                pet.status === "Do oddania" ? styles.available : styles.unavailable
                                            }`}
                                        >
                                            {pet.status}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Tagi</th>
                                    <td className={styles.tags}>
                                        {tags.map((tag) => {
                                            return <span>{tag?.character}</span>;
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

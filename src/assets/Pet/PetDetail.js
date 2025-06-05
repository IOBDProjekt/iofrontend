// src/assets/Pet/PetDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRedirect } from "../../navigation/RedirectHandlers";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getImageUrl } from "../../utils/imageUtils";
import api from "../../api";
import styles from "./Pet.module.css";

export default function PetDetail() {
  const { id } = useParams();
  const goBack = useRedirect(-1);

  const [pet, setPet] = useState(null);
  const [loadingPet, setLoadingPet] = useState(true);
  const [errorPet, setErrorPet] = useState(null);

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [pesel, setPesel] = useState("");
  const [motivation, setMotivation] = useState("");
  const [agreeToDataProcessing, setAgreeToDataProcessing] = useState(false);
  const [agreeToSpayNeuter, setAgreeToSpayNeuter] = useState(false);
  const [agreeToRules, setAgreeToRules] = useState(false);
  const [hasGardenAccess, setHasGardenAccess] = useState(false);

  useEffect(() => {
    async function fetchPet() {
      try {
        const response = await api.get(`/pet/${id}`);
        const petData = response.data.pets?.[0] || null;
        setPet(petData);
      } catch (err) {
        console.error("Failed to fetch pet data", err);
        setErrorPet("Nie udało się pobrać danych zwierzaka");
      } finally {
        setLoadingPet(false);
      }
    }

    async function fetchProfileData() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Brak tokena – użytkownik nie jest zalogowany");
        }
        const response = await api.get("/auth/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile data", err);
        setErrorProfile("Nie udało się pobrać danych profilu");
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchPet();
    fetchProfileData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loadingProfile || !profile) {
      alert("Czekam na dane użytkownika lub profil niedostępny");
      return;
    }
    if (pesel.trim().length < 11) {
      alert("PESEL musi mieć przynajmniej 11 znaków.");
      return;
    }
    if (motivation.trim().length < 50) {
      alert("Motywacja musi zawierać co najmniej 50 znaków.");
      return;
    }
    if (!agreeToDataProcessing || !agreeToRules) {
      alert(
        "Musisz wyrazić zgodę na przetwarzanie danych i zaakceptować regulamin."
      );
      return;
    }

    const payload = {
      ID_Uzytkownika: profile.id,
      ID_Zwierzecia: pet.id,
      Data_zlozenia: new Date().toISOString().split("T")[0],
      Komentarz_pracownika: motivation.trim(),
      Pesel: pesel.trim(),
    };

    try {
      await api.post("/adoption-request", payload);
      alert("Wniosek został wysłany!");
      setShowForm(false);
      setPesel("");
      setMotivation("");
      setAgreeToDataProcessing(false);
      setAgreeToSpayNeuter(false);
      setAgreeToRules(false);
      setHasGardenAccess(false);
    } catch (err) {
      console.error(
        "Błąd podczas wysyłania wniosku:",
        err.response?.data || err.message
      );
      alert("Błąd podczas wysyłania wniosku");
    }
  };

  if (loadingPet || loadingProfile) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorPet || !pet) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color={errorPet ? "error" : "textPrimary"}>
          {errorPet || "Nie znaleziono zwierzaka"}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mt: 2 }}>
          Wróć
        </Button>
      </Container>
    );
  }

  if (errorProfile || !profile) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color={errorProfile ? "error" : "textPrimary"}>
          {errorProfile || "Profil użytkownika niedostępny"}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mt: 2 }}>
          Wróć
        </Button>
      </Container>
    );
  }

  return (
    <div className={styles.container}>
      <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mb: 2 }}>
        Wróć do listy zwierząt
      </Button>

      <div className={styles.wrapper}>
        <div className={styles["image-container"]}>
          <img
            className={styles["pet-image"]}
            src={getImageUrl(pet.id_image)}
            alt={pet.name}
          />
        </div>

        <div className={styles.column}>
          <div className={styles["info-container"]}>
            <h4 className={styles.title}>Informacje</h4>
            <div className={styles["info-item"]}>
              <strong>Imię:</strong> <span>{pet.name}</span>
            </div>
            <div className={styles["info-item"]}>
              <strong>Status:</strong> <span>{pet.status}</span>
            </div>
          </div>

          <div className={styles["button-group"]}>
            {!showForm ? (
              <>
                {pet.status === "Do oddania" && (
                  <button onClick={() => setShowForm(true)}>
                    Wniosek o adopcję
                  </button>
                )}
                <button>Dopytaj o szczegóły</button>
                <button>Dodaj do ulubionych</button>
              </>
            ) : (
              <Box
                component="form"
                onSubmit={handleSubmit}
                className={styles["adoption-form"]}
              >
                <Typography variant="h6" className={styles.title}>
                  Wniosek Adopcyjny
                </Typography>

                <TextField
                  label="PESEL"
                  value={pesel}
                  onChange={(e) => setPesel(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  inputProps={{ maxLength: 11 }}
                  helperText={
                    pesel.trim().length > 0 && pesel.trim().length < 9
                      ? "PESEL musi mieć przynajmniej 11 znaków"
                      : ""
                  }
                />

                <TextField
                  label="Motywacja (min. 50 znaków)"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  required
                  error={
                    motivation.trim().length > 0 &&
                    motivation.trim().length < 50
                  }
                  helperText={
                    motivation.trim().length > 0 &&
                    motivation.trim().length < 50
                      ? "Motywacja musi mieć co najmniej 50 znaków"
                      : ""
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToSpayNeuter}
                      onChange={(e) => setAgreeToSpayNeuter(e.target.checked)}
                    />
                  }
                  label="Zobowiązuję się do kastracji/sterilizacji"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasGardenAccess}
                      onChange={(e) => setHasGardenAccess(e.target.checked)}
                    />
                  }
                  label="Posiadam ogród / dostęp do wybiegu"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToDataProcessing}
                      onChange={(e) =>
                        setAgreeToDataProcessing(e.target.checked)
                      }
                    />
                  }
                  label="Wyrażam zgodę na przetwarzanie danych osobowych*"
                  InputLabelProps={{ required: true }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeToRules}
                      onChange={(e) => setAgreeToRules(e.target.checked)}
                    />
                  }
                  label="Akceptuję regulamin adopcji*"
                  InputLabelProps={{ required: true }}
                />

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      pesel.trim().length < 9 ||
                      motivation.trim().length < 50 ||
                      !(agreeToDataProcessing && agreeToRules)
                    }
                  >
                    Wyślij wniosek
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      setShowForm(false);
                      setPesel("");
                      setMotivation("");
                      setAgreeToDataProcessing(false);
                      setAgreeToSpayNeuter(false);
                      setAgreeToRules(false);
                      setHasGardenAccess(false);
                    }}
                  >
                    Anuluj
                  </Button>
                </Stack>
              </Box>
            )}
          </div>

          <div
            className={styles["info-container"]}
            style={{ marginTop: "16px" }}
          >
            <h4 className={styles.title}>Dane schroniska</h4>
            <div className={styles["info-item"]}>
              <strong>Nazwa:</strong> <span>{pet.shelter?.name || "-"}</span>
            </div>
            <div className={styles["info-item"]}>
              <strong>Telefon:</strong>{" "}
              <a
                href={`tel:${pet.shelter?.number}`}
                className={styles.phoneLink}
              >
                {pet.shelter?.number || "-"}
              </a>
            </div>
            <div className={styles["info-item"]}>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${pet.shelter?.email}`}
                className={styles.emailLink}
              >
                {pet.shelter?.email || "-"}
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
                        pet.status === "Do oddania"
                          ? styles.available
                          : styles.unavailable
                      }`}
                    >
                      {pet.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Tagi</th>
                  <td className={styles.tags}>
                    {pet.tags.map((tag) => (
                      <span key={tag.id}>{tag.character}</span>
                    ))}
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

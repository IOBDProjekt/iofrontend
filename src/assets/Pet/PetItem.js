import React, { useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Stack, Chip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRedirect } from "../../navigation/RedirectHandlers";
import { getImageUrl } from "../../utils/imageUtils";
import { useUser } from "../../context/UserContext";

export default function PetItem({ pet = {}, onFavoriteToggle, isFavourite = false }) {
    const { id_pet, name = "", id_image, tags = [] } = pet;

    const redirectToPet = useRedirect(`/pet/${id_pet}`);

    const { role, fetchUserRole, user } = useUser();

    useEffect(() => {
        if (user) fetchUserRole();
    }, []);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                position: "relative",
            }}
            onClick={redirectToPet}
        >
            {role === "user" && (
                <IconButton
                    sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                    aria-label="favorite"
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle && onFavoriteToggle(pet.id_pet);
                    }}
                >
                    {isFavourite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
            )}

            <Box sx={{ position: "relative", pt: "56.25%", overflow: "hidden" }}>
                <CardMedia
                    component="img"
                    image={getImageUrl(id_image)}
                    alt={name}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#f0f0f0",
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                    {name}
                </Typography>
                {tags.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                        {tags.map((tagObj, index) => (
                            <Chip key={tagObj.id_tag || index} label={tagObj.character} size="small" />
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRedirect } from '../../navigation/RedirectHandlers';
import {
    Container,
    Typography,
    Box,
    Stack,
    Chip,
    CircularProgress,
    CardMedia,
    Button,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getImageUrl } from '../../utils/imageUtils';
import api from '../../api';

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
                console.error('Failed to fetch pet data', err);
                setError('Nie udało się pobrać danych zwierzaka');
            } finally {
                setLoading(false);
            }
        }
        fetchPet();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !pet) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" color={error ? 'error' : 'textPrimary'}>
                    {error || 'Nie znaleziono zwierzaka'}
                </Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mt: 2 }}>
                    Wróć
                </Button>
            </Container>
        );
    }

    const {
        name,
        id_image,
        age,
        sex,
        condition,
        status,
        breed,
        species,
        shelter,
        tags = []
    } = pet;

    const handleFavorite = (e) => {
        e.stopPropagation();
        setFavorite(prev => !prev);
        // TODO: add favorite persistence
        console.log('Favorite toggled:', !favorite);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
                Wróć do listy zwierząt
            </Button>

            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                {name}
            </Typography>

            {/* Main layout: left column with image/data, right column with buttons */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 3
                }}
            >
                {/* Left column: image, tags, data, favorite icon */}
                <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <IconButton
                        onClick={handleFavorite}
                        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                    >
                        {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <CardMedia
                        component="img"
                        image={getImageUrl(id_image)}
                        alt={name}
                        sx={{ width: 300, height: 'auto', mb: 2 }}
                    />

                    {tags.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                            {tags.map(tag => (
                                <Chip key={tag.id} label={tag.character} />
                            ))}
                        </Stack>
                    )}

                    <Stack spacing={1} sx={{ lineHeight: 1.6 }}>
                        <Typography><strong>Wiek:</strong> {age}</Typography>
                        <Typography><strong>Płeć:</strong> {sex}</Typography>
                        <Typography><strong>Stan zdrowia:</strong> {condition}</Typography>
                        <Typography><strong>Rasa:</strong> {breed?.name || '-'}</Typography>
                        <Typography><strong>Gatunek:</strong> {species?.name || '-'}</Typography>
                        <Typography><strong>Schronisko:</strong> {shelter?.name || '-'}</Typography>
                        <Typography><strong>Status:</strong> {status}</Typography>
                    </Stack>
                </Box>

                {/* Right column: message/adopt buttons */}
                <Stack direction="column" spacing={2} alignItems="flex-end">
                    <Button variant="contained">Wyślij wiadomość</Button>
                    <Button variant="contained">Adoptuj</Button>
                </Stack>
            </Box>
        </Container>
    );
}

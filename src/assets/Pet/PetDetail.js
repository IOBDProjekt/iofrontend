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
    Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getImageUrl } from '../../utils/imageUtils';
import api from '../../api';

export default function PetDetail() {
    const { id } = useParams();
    const goBack = useRedirect(-1);

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" color="error">{error}</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ mt: 2 }}>
                    Wróć
                </Button>
            </Container>
        );
    }

    if (!pet) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5">Nie znaleziono zwierzaka</Typography>
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

    return (
        <Container sx={{ mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
                Wróć do listy zwierząt
            </Button>

            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                {name}
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <CardMedia
                    component="img"
                    image={getImageUrl(id_image)}
                    alt={name}
                    sx={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                />
            </Box>

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
        </Container>
    );
}

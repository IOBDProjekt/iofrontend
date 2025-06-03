import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import { makeLookupMap } from '../../utils/lookupUtils';
import api from '../../api';

export default function PetDetail() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [breeds, setBreeds] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [shelters, setShelters] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [petRes, breedsRes, speciesRes, sheltersRes, tagsRes] = await Promise.all([
                    api.get(`/pet/${id}`),
                    api.get('/breeds'),
                    api.get('/species'),
                    api.get('/shelters'),
                    api.get('/tags')
                ]);
                setPet(petRes.data);
                setBreeds(breedsRes.data);
                setSpeciesList(speciesRes.data);
                setShelters(sheltersRes.data);
                setTagsList(tagsRes.data);
            } catch (error) {
                console.error('Failed to fetch pet data', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const breedsMap = useMemo(
        () => makeLookupMap(breeds, 'id_breed', 'name'),
        [breeds]
    );
    const speciesMap = useMemo(
        () => makeLookupMap(speciesList, 'id_species', 'name'),
        [speciesList]
    );
    const sheltersMap = useMemo(
        () => makeLookupMap(shelters, 'id_shelter', 'name'),
        [shelters]
    );
    const tagsMap = useMemo(
        () => makeLookupMap(tagsList, 'id_tag', 'character'),
        [tagsList]
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!pet || !pet.id_pet) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5">Nie znaleziono zwierzaka</Typography>
            </Container>
        );
    }

    const {
        name,
        id_image,
        age,
        sex,
        condition,
        id_breed,
        id_species,
        id_shelter,
        status,
        tags = []
    } = pet;

    const breedName = breedsMap[id_breed] || id_breed;
    const speciesName = speciesMap[id_species] || id_species;
    const shelterName = sheltersMap[id_shelter] || id_shelter;
    const tagLabels = tags.map(tagId => tagsMap[tagId] || tagId);

    return (
        <Container sx={{ mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} href="/pet/active">
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

            {tagLabels.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                    {tagLabels.map(label => (
                        <Chip key={label} label={label} />
                    ))}
                </Stack>
            )}

            <Stack spacing={1} sx={{ lineHeight: 1.6 }}>
                <Typography><strong>Wiek:</strong> {age}</Typography>
                <Typography><strong>Płeć:</strong> {sex}</Typography>
                <Typography><strong>Stan zdrowia:</strong> {condition}</Typography>
                <Typography><strong>Rasa:</strong> {breedName}</Typography>
                <Typography><strong>Gatunek:</strong> {speciesName}</Typography>
                <Typography><strong>Schronisko:</strong> {shelterName}</Typography>
                <Typography><strong>Status:</strong> {status}</Typography>
            </Stack>
        </Container>
    );
}

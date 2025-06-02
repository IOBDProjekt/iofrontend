import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CardMedia,
    Box,
    Stack,
    Chip
} from '@mui/material';
import { getImageUrl } from './utils/imageUtils';

export function PetDialog({ pet, breeds, speciesList, shelters, tagsList, onClose }) {
    if (!pet) return null;

    const breedObj =
        Array.isArray(breeds) &&
        breeds.find(b => String(b.id_breed) === String(pet.id_breed));
    const breedName = breedObj ? breedObj.name : String(pet.id_breed);

    const speciesObj =
        Array.isArray(speciesList) &&
        speciesList.find(s => String(s.id_species) === String(pet.id_species));
    const speciesName = speciesObj ? speciesObj.name : String(pet.id_species);

    const shelterObj =
        Array.isArray(shelters) &&
        shelters.find(s => String(s.id_shelter) === String(pet.id_shelter));
    const shelterName = shelterObj ? shelterObj.name : String(pet.id_shelter);

    const tagLabels = Array.isArray(pet.tags)
        ? pet.tags.map(tagId => {
            const found = Array.isArray(tagsList)
                ? tagsList.find(t => String(t.id_tag) === String(tagId))
                : null;
            return found ? found.character : String(tagId);
        })
        : [];

    return (
        <Dialog
            open={true}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            aria-labelledby="pet-dialog-title"
        >
            <DialogTitle id="pet-dialog-title">{pet.name}</DialogTitle>

            <DialogContent>
                {/* Obrazek */}
                <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                    <CardMedia
                        component="img"
                        image={getImageUrl(pet.id_image)}
                        alt={pet.name}
                        sx={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </Box>

                {/* Tagi */}
                {tagLabels.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                        {tagLabels.map(label => (
                            <Chip key={label} label={label} size="small" />
                        ))}
                    </Stack>
                )}

                <DialogContentText component="div" sx={{ lineHeight: 1.6 }}>
                    <strong>Imię:</strong> {pet.name} <br />
                    <strong>Wiek:</strong> {pet.age} <br />
                    <strong>Płeć:</strong> {pet.sex} <br />
                    <strong>Stan zdrowia:</strong> {pet.condition} <br />
                    <strong>Rasa:</strong> {breedName} <br />
                    <strong>Gatunek:</strong> {speciesName} <br />
                    <strong>Schronisko:</strong> {shelterName} <br />
                    <strong>Status:</strong> {pet.status} <br />
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Zamknij</Button>
            </DialogActions>
        </Dialog>
    );
}

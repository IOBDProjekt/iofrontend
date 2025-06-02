import React, { useMemo } from 'react';
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
import { getImageUrl } from '../../utils/imageUtils';
import { makeLookupMap } from '../../utils/lookupUtils';

export function PetDialog({
                              pet = {},
                              breeds = [],
                              speciesList = [],
                              shelters = [],
                              tagsList = [],
                              onClose,
                              open
                          }) {
    // Always call hooks at the top
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

    // If no valid pet provided, do not render dialog
    if (!pet || !pet.id_pet) return null;

    const {
        name = '',
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

    const breedName = breedsMap[String(id_breed)] || String(id_breed);
    const speciesName = speciesMap[String(id_species)] || String(id_species);
    const shelterName = sheltersMap[String(id_shelter)] || String(id_shelter);
    const tagLabels = Array.isArray(tags)
        ? tags.map(tagId => tagsMap[String(tagId)] || String(tagId))
        : [];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="pet-dialog-title">
            <DialogTitle id="pet-dialog-title">{name}</DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
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
                            <Chip key={label} label={label} size="small" />
                        ))}
                    </Stack>
                )}
                <DialogContentText component="div" sx={{ lineHeight: 1.6 }}>
                    <strong>Imię:</strong> {name}<br />
                    <strong>Wiek:</strong> {age}<br />
                    <strong>Płeć:</strong> {sex}<br />
                    <strong>Stan zdrowia:</strong> {condition}<br />
                    <strong>Rasa:</strong> {breedName}<br />
                    <strong>Gatunek:</strong> {speciesName}<br />
                    <strong>Schronisko:</strong> {shelterName}<br />
                    <strong>Status:</strong> {status}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zamknij</Button>
            </DialogActions>
        </Dialog>
    );
}
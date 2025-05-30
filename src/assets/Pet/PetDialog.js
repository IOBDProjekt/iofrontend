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

/**
 * Displays a dialog with pet details.
 * Props:
 * - pet: the selected pet (or null)
 * - onClose: callback to close dialog
 */
export function PetDialog({ pet, onClose }) {
    return (
        <Dialog
            open={Boolean(pet)}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            aria-labelledby="pet-dialog-title"
        >
            {pet && (
                <>
                    <DialogTitle id="pet-dialog-title">{pet.name}</DialogTitle>
                    <DialogContent>
                        <Box sx={{ width: '100%', height: 'auto', textAlign: 'center', mb: 2 }}>
                            <CardMedia
                                component="img"
                                image={getImageUrl(pet.id_image)}
                                alt={pet.name}
                                sx={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>

                        {pet.tags && pet.tags.length > 0 && (
                            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                                {pet.tags.map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        )}

                        <DialogContentText>
                            <strong>Wiek:</strong> {pet.age} lat<br />
                            <strong>Płeć:</strong> {pet.sex}<br />
                            <strong>Stan Zdrowia:</strong> {pet.condition}<br />
                            <strong>Status:</strong> {pet.status}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Zamknij</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

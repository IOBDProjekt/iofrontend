import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Button, Chip // Dodano Chip
} from '@mui/material';

// Przyjmuje jako propsy:
// - open: boolean, czy modal jest otwarty
// - onClose: funkcja do zamknięcia modala
// - pet: obiekt z danymi wybranego zwierzęcia (selectedPet)
export default function ViewPetModal({ open, onClose, pet }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            className="view-modal"
            sx={{ '& .MuiDialog-paper': { borderRadius: '12px', padding: '20px' } }}
        >
            {pet && (
                <>
                    <DialogTitle className="pet-modal-title">
                        {pet.name}
                    </DialogTitle>
                    <DialogContent>
                        <Box className="pet-modal-content">
                            {/* Kontener na zdjęcie */}
                            <Box className="pet-image-container">
                                <img
                                    src={pet.image}
                                    alt={pet.name}
                                    className="pet-image"
                                />
                            </Box>

                            {/* Sekcja z tagami */}
                            <Box sx={{ textAlign: 'center', my: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                    <strong>Kategoria:</strong> {pet.category || 'Brak danych'}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                    <strong>Wiek:</strong> {pet.age || 'Brak danych'}
                                </Typography>
                                {pet.traits && pet.traits.length > 0 && ( // Sprawdź czy są cechy
                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                        <Typography variant="body1" sx={{ fontSize: '1.2rem', width: '100%', fontWeight:'bold' }}>
                                            Cechy:
                                        </Typography>
                                        {pet.traits.map((trait) => (
                                            <Chip key={trait} label={trait} size="medium" sx={{fontSize: '1rem'}} />
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* Opis */}
                            <Typography
                                variant="body1"
                                className="pet-description" // Ta klasa jest w Home.css
                                sx={{ mt: 2 }} // Dodajmy trochę marginesu górnego
                            >
                                {pet.description}
                            </Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions className="pet-modal-actions">
                        <Button
                            onClick={onClose}
                            variant="contained"
                            className="close-button"
                        >
                            Zamknij
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
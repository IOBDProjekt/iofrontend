import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Button, Chip,
    IconButton, Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ViewPetModal({ open, onClose, pet, isFavorite, onToggleFavorite }) {
    if (!pet) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            className="view-modal"
            sx={{ '& .MuiDialog-paper': { borderRadius: '12px', padding: '20px' } }}
        >
            <>
                <DialogTitle className="pet-modal-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {pet.name}
                    <Tooltip title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}>
                        <IconButton
                            onClick={() => onToggleFavorite(pet.id)}
                            color={isFavorite ? "error" : "default"}
                            sx={{ ml: 2 }}
                        >
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <Box className="pet-modal-content">
                        <Box className="pet-image-container">
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="pet-image"
                            />
                        </Box>
                        <Box sx={{ textAlign: 'center', my: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                <strong>Kategoria:</strong> {pet.category || 'Brak danych'}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                                <strong>Wiek:</strong> {pet.age || 'Brak danych'}
                            </Typography>
                            {pet.traits && pet.traits.length > 0 && (
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
                        <Typography
                            variant="body1"
                            className="pet-description"
                            sx={{ mt: 2 }}
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
        </Dialog>
    );
}
import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function PostsGrid({ posts, onPetClick, favorites = [], onToggleFavorite }) {
    const handleFavoriteClick = (e, petId) => {
        e.stopPropagation();
        if (onToggleFavorite && typeof onToggleFavorite === 'function') {
            onToggleFavorite(petId);
        }
    };

    // Usuń duplikaty z posts
    const uniquePosts = posts.map(column => {
        const uniqueColumn = [];
        const ids = new Set();

        column.forEach(pet => {
            if (!ids.has(pet.id)) {
                ids.add(pet.id);
                uniqueColumn.push(pet);
            }
        });

        return uniqueColumn;
    });

    return (
        <Box className="posts-grid">
            {uniquePosts.map((column, colIndex) => (
                <Box key={colIndex} className="grid-column">
                    {column.map(pet => {
                        const isFavorite = favorites.includes(pet.id);
                        return (
                            <Card
                                key={pet.id}
                                className="pet-card"
                                onClick={() => onPetClick(pet)}
                                sx={{
                                    position: 'relative',
                                    border: isFavorite ? '2px solid #f44336' : 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <Box className="card-image-container">
                                    <CardMedia
                                        component="img"
                                        className="card-image"
                                        image={pet.image}
                                        alt={pet.name}
                                    />
                                    <IconButton
                                        aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                                        onClick={(e) => handleFavoriteClick(e, pet.id)}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)'
                                            }
                                        }}
                                    >
                                        {isFavorite ? (
                                            <FavoriteIcon color="error" />
                                        ) : (
                                            <FavoriteBorderIcon color="action" />
                                        )}
                                    </IconButton>
                                </Box>
                                <CardContent className="card-content">
                                    <Typography variant="h5" className="pet-name">
                                        {pet.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
}
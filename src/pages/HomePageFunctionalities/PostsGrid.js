import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

export default function PostsGrid({ posts, onPetClick }) {
    return (
        <Box className="posts-grid">
            {posts.map((column, colIndex) => (
                <Box key={colIndex} className="grid-column">
                    {column.map(pet => (
                        <Card
                            key={pet.id}
                            className="pet-card"
                            onClick={() => onPetClick(pet)}
                        >
                            <Box className="card-image-container">
                                <CardMedia
                                    component="img"
                                    className="card-image"
                                    image={pet.image}
                                    alt={pet.name}
                                />
                            </Box>
                            <CardContent className="card-content">
                                <Typography variant="h5" className="pet-name">
                                    {pet.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ))}
        </Box>
    );
}
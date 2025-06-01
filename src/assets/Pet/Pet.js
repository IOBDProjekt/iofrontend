import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Stack,
    Chip
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getImageUrl } from './utils/imageUtils';

/**
 * Displays a single pet as a card.
 * Props:
 * - pet: the pet object
 * - onSelect: callback when the card is clicked
 */
export default function Pet({ pet, onSelect }) {
    return (
        <Card
            sx={{
                height: '100%',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}
            onClick={() => onSelect(pet)}
        >
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                aria-label="favorite"
                onClick={e => e.stopPropagation()}
            >
                <FavoriteBorderIcon />
            </IconButton>

            <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    image={getImageUrl(pet.id_image)}
                    alt={pet.name}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" noWrap>
                    {pet.name}
                </Typography>

                {pet.tags && pet.tags.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                        {pet.tags.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                            />
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

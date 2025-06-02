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

export default function Pet({ pet, tagsList, onSelect }) {
    const tagLabels = Array.isArray(pet.tags)
        ? pet.tags.map(tagId => {
            const found = tagsList.find(t => t.id_tag === tagId);
            return found ? found.character : String(tagId);
        })
        : [];

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
            {/* Ikona ulubionych */}
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                aria-label="favorite"
                onClick={e => e.stopPropagation()}
            >
                <FavoriteBorderIcon />
            </IconButton>

            {/* Obraz */}
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

            {/* Zawartość karty */}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" noWrap>
                    {pet.name}
                </Typography>

                {/* Tagi */}
                {tagLabels.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                        {tagLabels.map(label => (
                            <Chip
                                key={label}
                                label={label}
                                size="small"
                            />
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

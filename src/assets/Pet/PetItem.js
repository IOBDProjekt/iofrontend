import React, { useMemo } from 'react';
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
import { useRedirect } from "../../navigation/RedirectHandlers";
import { getImageUrl } from '../../utils/imageUtils';
import { makeLookupMap } from '../../utils/lookupUtils';

export default function PetItem({
                                    pet = {},
                                    tagsList = [],
                                    onFavoriteToggle
                                }) {
    const redirectToPet = useRedirect(`/pet/${id_pet}`);

    const {
        id_pet,
        name = '',
        id_image,
        tags = []
    } = pet;

    const tagsMap = useMemo(
        () => makeLookupMap(tagsList, 'id_tag', 'character'),
        [tagsList]
    );
    const tagLabels = Array.isArray(tags)
        ? tags.map(tagId => tagsMap[String(tagId)] || String(tagId))
        : [];

    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}
            onClick={redirectToPet}
        >
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                aria-label="favorite"
                onClick={e => {
                    e.stopPropagation();
                    onFavoriteToggle && onFavoriteToggle(pet);
                }}
            >
                <FavoriteBorderIcon />
            </IconButton>

            <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    image={getImageUrl(id_image)}
                    alt={name}
                    sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                    {name}
                </Typography>
                {tagLabels.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                        {tagLabels.map(label => (
                            <Chip key={label} label={label} size="small" />
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

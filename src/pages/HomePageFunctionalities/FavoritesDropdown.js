import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavoritesDropdown({ favorites, allPosts }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const favoritePets = allPosts.filter(post => favorites.includes(post.id));

    return (
        <Box>
            <Button
                color="inherit"
                startIcon={
                    <Badge badgeContent={favorites.length} color="error">
                        <FavoriteIcon />
                    </Badge>
                }
                onClick={handleClick}
            >
                Polubione
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: '400px',
                        width: '300px',
                    },
                }}
            >
                {favoritePets.length > 0 ? (
                    favoritePets.map(pet => (
                        <MenuItem key={pet.id} onClick={handleClose}>
                            <Typography>{pet.name}</Typography>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        <Typography color="text.secondary">Brak ulubionych</Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}
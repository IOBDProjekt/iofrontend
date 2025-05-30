import React from 'react';
import { Box, CircularProgress} from '@mui/material';

export function Loading() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <CircularProgress />
        </Box>
    );
}

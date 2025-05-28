import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export default function PaginationControls({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Box className="pagination-container">
            <IconButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                <NavigateBeforeIcon fontSize="large" />
            </IconButton>

            <Typography variant="h6" className="page-info">
                Strona {currentPage} z {totalPages}
            </Typography>

            <IconButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                <NavigateNextIcon fontSize="large" />
            </IconButton>
        </Box>
    );
}
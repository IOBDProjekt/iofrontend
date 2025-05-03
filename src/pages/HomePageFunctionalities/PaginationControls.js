import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Przyjmuje jako propsy:
// - currentPage: aktualny numer strony
// - totalPages: całkowita liczba stron
// - onPageChange: funkcja do zmiany strony (paginate)
export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
    // Renderuj tylko jeśli jest więcej niż jedna strona
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
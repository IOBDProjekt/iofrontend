import React from 'react';
import { Grid, Box, Pagination } from '@mui/material';
import useAdviceApi from '../hooks/useAdviceApi';
import usePagination from '../hooks/usePagination';
import AdviceItem from '../assets/Advice/AdviceItem';
import { Loading } from '../assets/Loading';
import { ErrorDisplay } from '../assets/ErrorDisplay';

export default function Advices() {
    const { advices: allAdvices, loading, error } = useAdviceApi();
    const { page, totalPages, paginatedItems, handlePageChange } = usePagination(allAdvices, 12);

    if (loading) return <Loading />;
    if (error) return <ErrorDisplay message={String(error)} />;

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {paginatedItems.map(advice => (
                    <Grid item key={advice.id_advice} xs={12} sm={6} md={4} lg={3}>
                        <AdviceItem advice={advice} />
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
}
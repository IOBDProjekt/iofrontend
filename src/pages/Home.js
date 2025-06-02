import React, { useState, useEffect } from 'react';
import { Grid, Box, Pagination } from '@mui/material';
import usePetApi from '../hooks/usePetApi';
import { usePetFilters } from '../hooks/usePetFilters';
import PetItem from '../assets/Pet/PetItem';
import PetFilter from '../assets/Pet/PetFilter';
import { Loading } from '../assets/Loading';
import { ErrorDisplay } from '../assets/ErrorDisplay';

export default function Home() {
    const {
        pets: allPets,
        loading: petsLoading,
        error: petsError,
    } = usePetApi();

    const {
        filters,
        setFilters,
        breeds,
        speciesList,
        shelters,
        tagsList,
        sexList,
        statusList,
        filteredPets,
        loading: filtersLoading,
        error: filtersError,
    } = usePetFilters(allPets);

    const anyLoading =
        petsLoading ||
        filtersLoading.breeds ||
        filtersLoading.species ||
        filtersLoading.shelters ||
        filtersLoading.tags;

    const anyError =
        petsError ||
        filtersError.breeds ||
        filtersError.species ||
        filtersError.shelters ||
        filtersError.tags;

    const [page, setPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredPets.length / itemsPerPage);

    useEffect(() => {
        setPage(1);
    }, [filteredPets]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedPets = filteredPets.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    if (anyLoading) return <Loading />;
    if (anyError) return <ErrorDisplay message={String(anyError)} />;

    return (
        <Box p={2}>
            <PetFilter
                filters={filters}
                onChange={setFilters}
                breeds={breeds}
                speciesList={speciesList}
                shelters={shelters}
                tagsList={tagsList}
                sexList={sexList}
                statusList={statusList}
            />

            <Grid container spacing={2}>
                {paginatedPets.map(pet => (
                    <Grid item key={pet.id_pet} xs={12} sm={6} md={4} lg={3}>
                        <PetItem
                            pet={pet}
                            tagsList={tagsList}
                            breeds={breeds}
                            speciesList={speciesList}
                            shelters={shelters}
                            onFavoriteToggle={() => console.log('Favorited', pet.id_pet)}
                        />
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

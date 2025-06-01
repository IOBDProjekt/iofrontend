import React, { useMemo } from 'react';
import { Grid, Box } from '@mui/material';
import usePetApi from '../hooks/usePetApi';
import Pet from '../assets/Pet/Pet';
import { PetDialog } from '../assets/Pet/PetDialog';
import { Loading } from '../assets/Loading';
import { ErrorDisplay } from '../assets/ErrorDisplay';
import PetFilter from '../assets/Pet/PetFilter';

import { filterPets } from '../assets/Pet/utils/filterUtils';
import { usePetFilters } from '../hooks/usePetFilters';

export default function Home() {
    const { pets: allPets, loading, error, selectedPet, selectPet, clearSelection } = usePetApi();
    const { filters, setFilters, breeds, speciesList, shelters, tagsList } = usePetFilters();

    const filteredPets = useMemo(() => filterPets(allPets, filters), [allPets, filters]);

    if (loading) return <Loading />;
    if (error) return <ErrorDisplay message={error} />;

    return (
        <Box p={2}>
            <PetFilter
                filters={filters}
                onChange={setFilters}
                breeds={breeds}
                speciesList={speciesList}
                shelters={shelters}
                tagsList={tagsList}
            />

            <Grid container spacing={2}>
                {filteredPets.map(pet => (
                    <Grid item key={pet.id_pet} xs={12} sm={6} md={4} lg={3}>
                        <Pet pet={pet} onSelect={selectPet} />
                    </Grid>
                ))}
            </Grid>

            <PetDialog pet={selectedPet} onClose={clearSelection} />
        </Box>
    );
}

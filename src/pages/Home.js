import React from 'react';
import { Grid, Box} from '@mui/material';
import usePetApi from '../hooks/usePetApi';
import Pet from '../assets/Pet/Pet';
import { PetDialog } from '../assets/Pet/PetDialog';
import {Loading} from "../assets/Loading";
import {ErrorDisplay} from "../assets/ErrorDisplay";

export default function Home() {
    const { pets, loading, error, selectedPet, selectPet, clearSelection } = usePetApi();

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <ErrorDisplay message={error} />;
    }

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {pets.map(pet => (
                    <Grid item key={pet.id_pet} xs={12} sm={6} md={4} lg={3}>
                        <Pet pet={pet} onSelect={selectPet} />
                    </Grid>
                ))}
            </Grid>

            <PetDialog pet={selectedPet} onClose={clearSelection} />
        </Box>
    );
}
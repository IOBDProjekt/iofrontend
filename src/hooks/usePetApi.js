import { useState, useEffect } from 'react';
import api from '../api';

const usePetApi = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await api.get('/pet/active');
                setPets(res.data.pets);
            } catch (err) {
                console.error(err);
                setError('Failed to load pets.');
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const selectPet = pet => setSelectedPet(pet);
    const clearSelection = () => setSelectedPet(null);

    return { pets, loading, error, selectedPet, selectPet, clearSelection };
};

export default usePetApi;

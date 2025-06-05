import { useState, useEffect, useMemo } from 'react';
import api from '../api.js';
import { filterPets as filterPetsUtil } from '../utils/filterUtils';

export function usePetFilters(allPets) {
    const [filters, setFilters] = useState({
        name: '',
        age: '',
        condition: '',
        id_breed: '',
        id_shelter: '',
        id_species: '',
        sex: '',
        status: '',
        tags: [],
    });

    const [breeds, setBreeds] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [shelters, setShelters] = useState([]);
    const [tagsList, setTagsList] = useState([]);

    const [loading, setLoading] = useState({
        breeds: false,
        species: false,
        shelters: false,
        tags: false,
    });
    const [error, setError] = useState({
        breeds: null,
        species: null,
        shelters: null,
        tags: null,
    });

    const fetchBreeds = async () => {
        setLoading(prev => ({ ...prev, breeds: true }));
        setError(prev => ({ ...prev, breeds: null }));
        try {
            const response = await api.get('/breed');
            if (Array.isArray(response.data.breeds)) {
                const mapped = response.data.breeds.map(b => ({
                    id_breed: String(b.id_breed),
                    name: b.name,
                    id_species: String(b.id_species),
                }));
                setBreeds(mapped);
            } else {
                console.warn('Unexpected response shape from /breed:', response.data);
                setBreeds([]);
            }
        } catch (err) {
            setError(prev => ({ ...prev, breeds: err }));
        } finally {
            setLoading(prev => ({ ...prev, breeds: false }));
        }
    };

    const fetchSpecies = async () => {
        setLoading(prev => ({ ...prev, species: true }));
        setError(prev => ({ ...prev, species: null }));
        try {
            const response = await api.get('/species');
            if (Array.isArray(response.data.species)) {
                const mapped = response.data.species.map(s => ({
                    id_species: String(s.id_species),
                    name: s.name,
                }));
                setSpeciesList(mapped);
            } else {
                console.warn('Unexpected response shape from /species:', response.data);
                setSpeciesList([]);
            }
        } catch (err) {
            setError(prev => ({ ...prev, species: err }));
        } finally {
            setLoading(prev => ({ ...prev, species: false }));
        }
    };

    const fetchShelters = async () => {
        setLoading(prev => ({ ...prev, shelters: true }));
        setError(prev => ({ ...prev, shelters: null }));
        try {
            const response = await api.get('/shelter');
            if (Array.isArray(response.data.shelters)) {
                const mapped = response.data.shelters.map(s => ({
                    id_shelter: String(s.id_shelter),
                    name: s.name,
                }));
                setShelters(mapped);
            } else {
                console.warn('Unexpected response shape from /shelter:', response.data);
                setShelters([]);
            }
        } catch (err) {
            setError(prev => ({ ...prev, shelters: err }));
        } finally {
            setLoading(prev => ({ ...prev, shelters: false }));
        }
    };

    const fetchTags = async () => {
        setLoading(prev => ({ ...prev, tags: true }));
        setError(prev => ({ ...prev, tags: null }));
        try {
            const response = await api.get('/tag');
            if (Array.isArray(response.data.tags)) {
                const mapped = response.data.tags.map(t => ({
                    id_tag: String(t.id_tag),
                    character: t.character,
                }));
                setTagsList(mapped);
            } else {
                console.warn('Unexpected format from /tag:', response.data);
                setTagsList([]);
            }
        } catch (err) {
            setError(prev => ({ ...prev, tags: err }));
        } finally {
            setLoading(prev => ({ ...prev, tags: false }));
        }
    };

    useEffect(() => {
        fetchBreeds();
        fetchSpecies();
        fetchShelters();
        fetchTags();
    }, []);

    const sexList = useMemo(() => {
        if (!Array.isArray(allPets)) return [];
        return Array.from(new Set(allPets.map(pet => pet.sex))).filter(Boolean);
    }, [allPets]);

    const statusList = useMemo(() => {
        if (!Array.isArray(allPets)) return [];
        return Array.from(new Set(allPets.map(pet => pet.status))).filter(Boolean);
    }, [allPets]);

    const filteredPets = useMemo(() => {
        if (!Array.isArray(allPets)) return [];
        return filterPetsUtil(allPets, filters, tagsList);
        }, [allPets, filters, tagsList]);


    return {
        filters,
        setFilters,
        breeds,
        speciesList,
        shelters,
        tagsList,
        sexList,
        statusList,
        filteredPets,
        loading,
        error,
    };
}

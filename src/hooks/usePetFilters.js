import { useState, useEffect } from 'react';

export function usePetFilters() {
    const [filters, setFilters] = useState({
        name: '',
        age: '',
        condition: '',
        id_breed: '',
        id_shelter: '',
        id_species: '',
        sex: '',
        status: '',
        tags: []
    });

    const [breeds, setBreeds] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [shelters, setShelters] = useState([]);
    const [tagsList, setTagsList] = useState([]);

    useEffect(() => {
        // TODO: replace static data with real API calls
        setBreeds([{ id: 1, name: 'Labrador' }, { id: 2, name: 'Beagle' }]);
        setSpeciesList([{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }]);
        setShelters([{ id: 1, name: 'Main Shelter' }, { id: 2, name: 'Rescue House' }]);
        setTagsList([{ id: 1, name: 'Friendly' }, { id: 2, name: 'Energetic' }]);
    }, []);

    return { filters, setFilters, breeds, speciesList, shelters, tagsList };
}
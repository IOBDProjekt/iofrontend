import { useState, useEffect } from 'react';
import api from '../api';

const useAdviceApi = () => {
    const [advices, setAdvices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAdvice, setSelectedAdvice] = useState(null);

    useEffect(() => {
        const fetchAdvices = async () => {
            try {
                const res = await api.get('/advice/all');
                setAdvices(res.data.advices);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 403) {
                    setError('Brak dostępu do porad.');
                    setAdvices([]);
                } else {
                    setError('Nie udało się załadować porad.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAdvices();
    }, []);

    const selectAdvice = advice => setSelectedAdvice(advice);
    const clearSelection = () => setSelectedAdvice(null);

    return { advices, loading, error, selectedAdvice, selectAdvice, clearSelection };
};

export default useAdviceApi;
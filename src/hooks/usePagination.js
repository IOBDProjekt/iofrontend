import { useState, useEffect, useCallback } from 'react';

export default function usePagination(items = [], itemsPerPage = 10) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        setPage(1);
    }, [items]);

    const handlePageChange = useCallback((event, value) => {
        setPage(value);
    }, []);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    return {
        page,
        setPage,
        totalPages,
        paginatedItems,
        handlePageChange,
    };
}

import { useState, useMemo, useEffect } from 'react';
import defaultPosts from './defaultPosts';

const postsPerPage = 6;
const FAVORITES_KEY = 'favoritePets';

export default function useHomeLogic() {
    const [userPosts, setUserPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
    const [selectedAgeFilter, setSelectedAgeFilter] = useState('');
    const [selectedTraitsFilter, setSelectedTraitsFilter] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [favorites, setFavorites] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(FAVORITES_KEY);
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const toggleFavorite = (petId) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(petId)
                ? prev.filter(id => id !== petId)
                : [...prev, petId];
            if (typeof window !== 'undefined') {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            }
            return newFavorites;
        });
    };

    const allPosts = useMemo(() => [...defaultPosts, ...userPosts], [userPosts]);

    const filteredPosts = useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return allPosts.filter(post => {
            const categoryMatch = selectedCategoryFilter ? post.category === selectedCategoryFilter : true;
            const ageMatch = selectedAgeFilter ? post.age === selectedAgeFilter : true;
            const traitsMatch = selectedTraitsFilter.length > 0
                ? selectedTraitsFilter.every(filterTrait => post.traits?.includes(filterTrait))
                : true;
            const searchMatch = lowerCaseSearchTerm
                ? post.name.toLowerCase().includes(lowerCaseSearchTerm) || post.description.toLowerCase().includes(lowerCaseSearchTerm)
                : true;
            return categoryMatch && ageMatch && traitsMatch && searchMatch;
        });
    }, [allPosts, selectedCategoryFilter, selectedAgeFilter, selectedTraitsFilter, searchTerm]);

    const totalFilteredPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalFilteredPosts / postsPerPage);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        } else if (currentPage === 0 && totalPages > 0) {
            setCurrentPage(1);
        } else if (totalFilteredPosts === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage, totalFilteredPosts]);

    const currentPosts = useMemo(() => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    }, [filteredPosts, currentPage]);

    const columns = useMemo(() => {
        const cols = [[], [], []];
        currentPosts.forEach((pet, index) => {
            cols[index % 3].push(pet);
        });
        return cols;
    }, [currentPosts]);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        } else if (totalPages === 0 && pageNumber === 1) {
            setCurrentPage(1);
        } else if (pageNumber > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (pageNumber < 1) {
            setCurrentPage(1);
        }
    };

    const handleCategoryFilterChange = (event) => {
        setSelectedCategoryFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleAgeFilterChange = (event) => {
        setSelectedAgeFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleTraitsFilterChange = (event, newValue) => {
        setSelectedTraitsFilter(newValue);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const addUserPost = (newPet) => {
        setUserPosts(prev => [newPet, ...prev]);
        const doesCategoryMatch = selectedCategoryFilter ? newPet.category === selectedCategoryFilter : true;
        const doesAgeMatch = selectedAgeFilter ? newPet.age === selectedAgeFilter : true;
        const doesTraitsMatch = selectedTraitsFilter.length > 0
            ? selectedTraitsFilter.every(filterTrait => newPet.traits?.includes(filterTrait))
            : true;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const doesSearchMatch = lowerCaseSearchTerm
            ? newPet.name.toLowerCase().includes(lowerCaseSearchTerm) || newPet.description.toLowerCase().includes(lowerCaseSearchTerm)
            : true;
        const newPostMatchesFilters = doesCategoryMatch && doesAgeMatch && doesTraitsMatch && doesSearchMatch;

        const updatedAllPostsForPagination = [newPet, ...allPosts];
        const updatedFilteredPostsForPagination = updatedAllPostsForPagination.filter(post => {
            const categoryMatch = selectedCategoryFilter ? post.category === selectedCategoryFilter : true;
            const ageMatch = selectedAgeFilter ? post.age === selectedAgeFilter : true;
            const traitsMatch = selectedTraitsFilter.length > 0
                ? selectedTraitsFilter.every(filterTrait => post.traits?.includes(filterTrait))
                : true;
            const searchMatch = lowerCaseSearchTerm
                ? post.name.toLowerCase().includes(lowerCaseSearchTerm) || post.description.toLowerCase().includes(lowerCaseSearchTerm)
                : true;
            return categoryMatch && ageMatch && traitsMatch && searchMatch;
        });
        const updatedTotalPages = Math.ceil(updatedFilteredPostsForPagination.length / postsPerPage);

        if (newPostMatchesFilters && updatedFilteredPostsForPagination.length > postsPerPage && updatedFilteredPostsForPagination.length % postsPerPage === 1) {
            paginate(updatedTotalPages);
        }
    };

    return {
        currentPage,
        totalPages,
        columns,
        totalFilteredPosts,
        selectedCategoryFilter,
        selectedAgeFilter,
        selectedTraitsFilter,
        searchTerm,
        favorites,
        toggleFavorite,
        paginate,
        handleCategoryFilterChange,
        handleAgeFilterChange,
        handleTraitsFilterChange,
        handleSearchChange,
        addUserPost,
        allPosts
    };
}
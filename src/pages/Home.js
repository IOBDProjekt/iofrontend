import React, { useState } from 'react';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import PostsGrid from './HomePageFunctionalities/PostsGrid';
import AddPetModal from './HomePageFunctionalities/AddPetModal';
import ViewPetModal from './HomePageFunctionalities/ViewPetModal';
import PaginationControls from './HomePageFunctionalities/PaginationControls';
import FilterControls from './HomePageFunctionalities/FilterControls';

import useHomeLogic from './HomePageFunctionalities/useHomeLogic';

import petCategories from './HomePageFunctionalities/petCategories';
import petAges from './HomePageFunctionalities/petAges';
import petTraits from './HomePageFunctionalities/petTraits';

import './Home.css';

export default function Home() {
    const {
        currentPage, totalPages, columns, totalFilteredPosts,
        selectedCategoryFilter, selectedAgeFilter, selectedTraitsFilter, searchTerm,
        paginate, handleCategoryFilterChange, handleAgeFilterChange, favorites,
        toggleFavorite,
        handleTraitsFilterChange, handleSearchChange, addUserPost
    } = useHomeLogic();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    const initialFormData = {
        name: '', description: '', image: null, preview: '',
        category: '', age: '', traits: []
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (event) => {
        setFormData(prev => ({ ...prev, category: event.target.value }));
    };

    const handleAgeChange = (event) => {
        setFormData(prev => ({ ...prev, age: event.target.value }));
    };

    const handleTraitsChange = (event, newValue) => {
        if (newValue.length <= 4) {
            setFormData(prev => ({ ...prev, traits: newValue }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: file, preview: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setFormData(initialFormData);
    };

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
    };

    const handleSubmit = () => {
        const newPet = {
            id: Date.now(), name: formData.name, description: formData.description,
            image: formData.preview, category: formData.category, age: formData.age,
            traits: formData.traits
        };
        addUserPost(newPet);
        handleCloseAddModal();
    };

    const handleViewPet = (pet) => {
        setSelectedPet(pet);
        setOpenViewModal(true);
    };

    return (
        <Box className="home-container">
            <Box className="top-controls-container">
                <Box className="search-section">
                    <TextField
                        label="Szukaj (nazwa, opis)"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                        sx={{ backgroundColor: 'white' }}
                    />
                    <IconButton className="search-button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>

                <Box className="add-button-container">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddModal(true)}
                        className="add-button"
                    >
                        Dodaj
                    </Button>
                </Box>
            </Box>

            <FilterControls
                categories={petCategories}
                ages={petAges}
                traits={petTraits}
                selectedCategory={selectedCategoryFilter}
                selectedAge={selectedAgeFilter}
                selectedTraits={selectedTraitsFilter}
                onCategoryChange={handleCategoryFilterChange}
                onAgeChange={handleAgeFilterChange}
                onTraitsChange={handleTraitsFilterChange}
            />

            {columns.flat().length > 0 ? (
                <PostsGrid
                    posts={columns}
                    onPetClick={handleViewPet}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', my: 4, color: 'text.secondary' }}>
                    {searchTerm || selectedCategoryFilter || selectedAgeFilter || selectedTraitsFilter.length > 0 ? 'Brak zwierząt pasujących do wyszukiwania i filtrów.' : 'Brak zwierząt do wyświetlenia.'}
                </Typography>
            )}

            {totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginate}
                />
            )}

            <AddPetModal
                open={openAddModal}
                onClose={handleCloseAddModal}
                formData={formData}
                onFormChange={handleChange}
                onCategoryChange={handleCategoryChange}
                onAgeChange={handleAgeChange}
                onTraitsChange={handleTraitsChange}
                onImageChange={handleImageChange}
                onSubmit={handleSubmit}
                categories={petCategories}
                ages={petAges}
                traits={petTraits}
            />

            <ViewPetModal
                open={openViewModal}
                onClose={handleCloseViewModal}
                pet={selectedPet}
                isFavorite={selectedPet && favorites.includes(selectedPet.id)}
                onToggleFavorite={toggleFavorite}
            />
        </Box>
    );
}
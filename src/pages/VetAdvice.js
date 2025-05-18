import React, { useState } from 'react';
import {
    Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, Card, CardContent, CardMedia
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import vetAdvicePosts from '../data/vetAdvicePosts';
import useVetAdviceLogic from './VetAdvice/useVetAdviceLogic';
import PaginationControls from './HomePageFunctionalities/PaginationControls'

export default function VetAdvice() {
    const {
        posts,
        currentPosts,
        currentPage,
        totalPages,
        paginate,
        addPost
    } = useVetAdviceLogic(vetAdvicePosts);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        preview: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

    const handleSubmit = () => {
        const newPost = {
            id: Date.now(),
            title: formData.title,
            content: formData.content,
            image: formData.preview,
            link: formData.link
        };
        addPost(newPost);
        handleCloseAddModal();
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
        setOpenViewModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setFormData({
            title: '',
            content: '',
            image: null,
            preview: '',
            link: ''
        });
    };

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
    };

    return (
        <Box sx={{
            padding: 4,
            maxWidth: 1200,
            margin: '0 auto',
            backgroundColor: '#E8F5E9'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4
            }}>
                <Typography variant="h4" component="h1" sx={{ color: '#2E7D32' }}>
                    Porady Weterynaryjne
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddModal(true)}
                    sx={{
                        backgroundColor: '#388E3C',
                        '&:hover': {
                            backgroundColor: '#2E7D32'
                        }
                    }}
                >
                    Dodaj poradę
                </Button>
            </Box>

            {currentPosts.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {currentPosts.map(post => (
                        <Card key={post.id} onClick={() => handleViewPost(post)} sx={{
                            cursor: 'pointer',
                            transition: 'transform 0.3s',
                            backgroundColor: 'white',
                            '&:hover': {
                                transform: 'scale(1.01)',
                                boxShadow: 3
                            }
                        }}>
                            <Box sx={{ display: 'flex', height: 200 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 300, objectFit: 'cover' }}
                                    image={post.image}
                                    alt={post.title}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {post.content}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', my: 4, color: 'text.secondary' }}>
                    Brak porad do wyświetlenia. Dodaj pierwszą poradę!
                </Typography>
            )}


            {totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginate}
                />
            )}

            <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="md">
                <DialogTitle sx={{
                    backgroundColor: 'white',
                    color: '#2E7D32',
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    Dodaj nową poradę
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: 'white', paddingTop: 3 }}>
                    <TextField
                        fullWidth
                        label="Tytuł"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Treść"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Link (opcjonalnie)"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: '#388E3C',
                            mb: 3,
                            '&:hover': {
                                backgroundColor: '#2E7D32'
                            }
                        }}
                    >
                        Wybierz zdjęcie
                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </Button>
                    {formData.preview && (
                        <Box sx={{ width: '100%', height: 300, mb: 3 }}>
                            <img
                                src={formData.preview}
                                alt="Podgląd"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: 'white',
                    borderTop: '1px solid #e0e0e0'
                }}>
                    <Button onClick={handleCloseAddModal} sx={{ color: '#2E7D32' }}>
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.content || !formData.preview}
                        variant="contained"
                        sx={{
                            backgroundColor: '#388E3C',
                            '&:hover': {
                                backgroundColor: '#2E7D32'
                            }
                        }}
                    >
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal podglądu */}
            <Dialog open={openViewModal} onClose={handleCloseViewModal} fullWidth maxWidth="md">
                {selectedPost && (
                    <>
                        <DialogTitle sx={{
                            backgroundColor: 'white',
                            color: '#2E7D32',
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            {selectedPost.title}
                        </DialogTitle>
                        <DialogContent sx={{ backgroundColor: 'white' }}>
                            <Box sx={{ width: '100%', height: 400, mb: 3 }}>
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </Box>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {selectedPost.content}
                            </Typography>
                            {selectedPost.link && (
                                <Typography variant="body1">
                                    <strong>Link:</strong>{' '}
                                    <a href={selectedPost.link} target="_blank" rel="noopener noreferrer">
                                        {selectedPost.link}
                                    </a>
                                </Typography>
                            )}
                        </DialogContent>
                        <DialogActions sx={{
                            backgroundColor: 'white',
                            borderTop: '1px solid #e0e0e0'
                        }}>
                            <Button onClick={handleCloseViewModal} sx={{ color: '#2E7D32' }}>
                                Zamknij
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
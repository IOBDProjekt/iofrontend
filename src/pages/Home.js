import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    TextField,
    Card,
    CardMedia,
    CardContent,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Home() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        preview: ''
    });

    // Stałe przykładowe posty (zawsze widoczne)
    const defaultPosts = [
        {
            id: 1,
            name: 'La vaca Saturno saturnita',
            description: 'Energiczny pies, uwielbia długie spacery i zabawę w parku.',
            image: '/post1.png'
        },
        {
            id: 2,
            name: 'Emeliza',
            description: 'Spokojna suczka, idealna dla rodzin z dziećmi.',
            image: '/post2.jpg'
        },
        {
            id: 3,
            name: 'Rex',
            description: 'Młody pies, potrzebuje dużo ruchu i uwagi.',
            image: '/post3.jpg'
        }
    ];

    const [userPosts, setUserPosts] = useState([]);
    const allPosts = [...defaultPosts, ...userPosts];

    // Paginacja
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    preview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const newPet = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            image: formData.preview
        };

        setUserPosts(prev => [newPet, ...prev]); // Dodaj nowy post na początek
        handleCloseAddModal();
        // Przejdź do pierwszej strony jeśli dodajemy nowy post
        if (allPosts.length >= postsPerPage) {
            paginate(1);
        }
    };

    const handleViewPet = (pet) => {
        setSelectedPet(pet);
        setOpenViewModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setFormData({
            name: '',
            description: '',
            image: null,
            preview: ''
        });
    };

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
    };

    // Podział zwierząt na 3 kolumny
    const columns = [[], [], []];
    currentPosts.forEach((pet, index) => {
        columns[index % 3].push(pet);
    });

    return (
        <Box sx={{
            p: 3,
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}>
            {/* Przycisk dodawania */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '16px'
            }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddModal(true)}
                    sx={{
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#388E3C',
                        },
                        padding: '12px 28px',
                        fontSize: '1.2rem'
                    }}
                >
                    Dodaj
                </Button>
            </Box>

            {/* Grid z trzema kolumnami */}
            <Box sx={{
                display: 'flex',
                gap: '40px',
                padding: '0 40px'
            }}>
                {columns.map((column, colIndex) => (
                    <Box key={colIndex} sx={{ flex: 1 }}>
                        {column.map(pet => (
                            <Card
                                key={pet.id}
                                sx={{
                                    mb: 3,
                                    cursor: 'pointer',
                                    width: '100%',
                                    border: '2px solid #fff',
                                    '&:hover': {
                                        boxShadow: 3,
                                        border: '2px solid #e0e0e0'
                                    }
                                }}
                                onClick={() => handleViewPet(pet)}
                            >
                                <Box sx={{
                                    padding: '10px',
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            aspectRatio: '1/1',
                                            objectFit: 'cover',
                                            width: '80%',
                                            borderRadius: '4px'
                                        }}
                                        image={pet.image}
                                        alt={pet.name}
                                    />
                                </Box>
                                <CardContent sx={{ padding: '16px', textAlign: 'center' }}>
                                    <Typography variant="h5" sx={{
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {pet.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Paginacja */}
            {allPosts.length > postsPerPage && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    mt: 2
                }}>
                    <IconButton
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        sx={{
                            padding: '12px',
                            fontSize: '1.2rem'
                        }}
                    >
                        <NavigateBeforeIcon fontSize="large" />
                    </IconButton>

                    <Typography variant="h6" sx={{ fontSize: '1.3rem' }}>
                        Strona {currentPage} z {totalPages}
                    </Typography>

                    <IconButton
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        sx={{
                            padding: '12px',
                            fontSize: '1.2rem'
                        }}
                    >
                        <NavigateNextIcon fontSize="large" />
                    </IconButton>
                </Box>
            )}



            {/* Mniejszy modal dodawania */}
            <Dialog
                open={openAddModal}
                onClose={handleCloseAddModal}
                fullWidth
                maxWidth="sm" // Zmienione z "md" na "sm" dla mniejszego modala
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '16px' // Zmniejszony padding
                    }
                }}
            >
                <DialogTitle sx={{
                    fontSize: '1.8rem', // Zmniejszona czcionka
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: '16px' // Mniejszy padding
                }}>
                    Dodaj nowe zwierzę
                </DialogTitle>
                <DialogContent sx={{ padding: '12px' }}> {/* Mniejszy padding */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // Mniejszy gap
                        mt: 1
                    }}>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                padding: '12px', // Mniejszy padding
                                fontSize: '1.1rem' // Mniejsza czcionka
                            }}
                        >
                            Wybierz zdjęcie
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>

                        {formData.preview && (
                            <Box sx={{
                                width: '100%',
                                height: '300px', // Mniejsza wysokość
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px'
                            }}>
                                <img
                                    src={formData.preview}
                                    alt="Podgląd"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </Box>
                        )}

                        <TextField
                            label="Imię zwierzęcia"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                style: {
                                    fontSize: '1.1rem', // Mniejsza czcionka
                                    padding: '8px' // Mniejszy padding
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: '1.1rem' // Mniejsza czcionka
                                }
                            }}
                            sx={{ marginTop: '12px' }} // Mniejszy margin
                        />

                        <TextField
                            label="Opis"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4} // Mniej wierszy
                            fullWidth
                            InputProps={{
                                style: {
                                    fontSize: '1.1rem', // Mniejsza czcionka
                                    padding: '8px' // Mniejszy padding
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: '1.1rem' // Mniejsza czcionka
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    justifyContent: 'space-between',
                    padding: '12px' // Mniejszy padding
                }}>
                    <Button
                        onClick={handleCloseAddModal}
                        sx={{
                            fontSize: '1.1rem', // Mniejsza czcionka
                            padding: '8px 16px' // Mniejszy padding
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formData.name || !formData.preview}
                        variant="contained"
                        sx={{
                            fontSize: '1.1rem', // Mniejsza czcionka
                            padding: '8px 24px' // Mniejszy padding
                        }}
                    >
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal podglądu zwierzęcia - dodaj ten fragment */}
            <Dialog
                open={openViewModal}
                onClose={handleCloseViewModal}
                maxWidth="md"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '20px'
                    }
                }}
            >
                {selectedPet && (
                    <>
                        <DialogTitle sx={{
                            fontSize: '2.2rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            padding: '16px'
                        }}>
                            {selectedPet.name}
                        </DialogTitle>
                        <DialogContent>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 3
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    height: '400px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '8px'
                                }}>
                                    <img
                                        src={selectedPet.image}
                                        alt={selectedPet.name}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.4rem',
                                        textAlign: 'center',
                                        lineHeight: 1.6,
                                        padding: '0 20px'
                                    }}
                                >
                                    {selectedPet.description}
                                </Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center', padding: '20px' }}>
                            <Button
                                onClick={handleCloseViewModal}
                                variant="contained"
                                sx={{
                                    fontSize: '1.2rem',
                                    padding: '10px 30px'
                                }}
                            >
                                Zamknij
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
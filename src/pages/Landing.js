import React from 'react';
import { Box, Typography, Button} from '@mui/material';
import { useRedirect } from '../navigation/RedirectHandlers';

export default function Landing() {
    const handleRedirectToHome = useRedirect('/home');

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                padding: 0,
                margin: 0
            }}
        >
            {/* Lewa strona - Tekst i przycisk */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 4,
                zIndex: 1
            }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '7rem',
                        fontWeight: 'bold',
                        color: '#4CAF50',
                        marginBottom: '2rem',
                        textAlign: 'center',
                        lineHeight: 1.1,
                        fontFamily: '"Poppins", sans-serif'
                    }}
                >
                    Szczęśliwe Łapki
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        color: '#333',
                        marginBottom: '3rem',
                        textAlign: 'center',
                        fontWeight: 500,
                        fontFamily: '"Poppins", sans-serif'
                    }}
                >
                    Znajdź i Pokochaj Pupila
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleRedirectToHome}
                    sx={{
                        px: 8,
                        py: 2,
                        fontSize: '1.5rem',
                        backgroundColor: '#67AE6E',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#26A69A',
                        },
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                >
                    Wejdź
                </Button>
            </Box>

            {/* Prawa strona - Zdjęcie psa */}
            <Box sx={{
                flex: 1,
                position: 'relative',
                height: '100vh'
            }}>
                <Box
                    component="img"
                    src="/landingpagephoto.png"
                    alt="Szczęśliwy pies"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </Box>
        </Box>
    );
}
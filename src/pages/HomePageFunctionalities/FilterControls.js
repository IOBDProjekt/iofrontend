import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField,
    Select, MenuItem, InputLabel, FormControl, Chip, Autocomplete // Dodane importy
} from '@mui/material';

export default function AddPetModal({
                                        open, onClose, formData, onFormChange, onCategoryChange, onAgeChange, onTraitsChange, // Nowe handlery
                                        onImageChange, onSubmit, categories, ages, traits // Nowe propsy z opcjami
                                    }) {
    const maxTraits = 4;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            className="add-modal"
            sx={{ '& .MuiDialog-paper': { borderRadius: '12px', padding: '16px' } }}
        >
            <DialogTitle className="modal-title">
                Dodaj nowe zwierzę
            </DialogTitle>
            <DialogContent className="modal-content">
                {/* Dodaj noValidate do Box jeśli używasz required */}
                <Box className="form-container" component="form" noValidate autoComplete="off">
                    {/* Przycisk Wyboru Zdjęcia */}
                    <Button variant="contained" component="label" className="image-upload-button">
                        Wybierz zdjęcie
                        <input type="file" hidden accept="image/*" onChange={onImageChange} />
                    </Button>

                    {/* Podgląd Zdjęcia */}
                    {formData.preview && (
                        <Box className="image-preview-container">
                            <img src={formData.preview} alt="Podgląd" className="image-preview" />
                        </Box>
                    )}

                    {/* Imię Zwierzęcia */}
                    <TextField
                        label="Imię zwierzęcia"
                        name="name"
                        value={formData.name}
                        onChange={onFormChange}
                        fullWidth
                        required // Dodajmy wymagalność
                        className="form-field"
                        InputProps={{ style: { fontSize: '1.1rem', padding: '8px' } }}
                        InputLabelProps={{ style: { fontSize: '1.1rem' } }}
                        sx={{ marginTop: '12px' }} // Zachowaj margines
                    />

                    {/* Kategoria Zwierzęcia */}
                    <FormControl fullWidth className="form-field" required>
                        <InputLabel id="category-select-label" style={{ fontSize: '1.1rem' }}>Kategoria</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            name="category" // Nazwa jest ważna dla stanu
                            value={formData.category}
                            label="Kategoria"
                            onChange={onCategoryChange} // Użyj dedykowanego handlera
                            style={{ fontSize: '1.1rem' }} // Styl dla Select
                        >
                            {/* Dodaj pustą opcję, jeśli chcesz placeholder */}
                            <MenuItem value="" disabled><em>Wybierz kategorię...</em></MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category} style={{ fontSize: '1.1rem' }}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Wiek Zwierzęcia */}
                    <FormControl fullWidth className="form-field" required>
                        <InputLabel id="age-select-label" style={{ fontSize: '1.1rem' }}>Wiek</InputLabel>
                        <Select
                            labelId="age-select-label"
                            id="age-select"
                            name="age"
                            value={formData.age}
                            label="Wiek"
                            onChange={onAgeChange} // Użyj dedykowanego handlera
                            style={{ fontSize: '1.1rem' }}
                        >
                            <MenuItem value="" disabled><em>Wybierz wiek...</em></MenuItem>
                            {ages.map((age) => (
                                <MenuItem key={age} value={age} style={{ fontSize: '1.1rem' }}>
                                    {age}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Cechy Zwierzęcia (Autocomplete) */}
                    <Autocomplete
                        multiple // Pozwala na wielokrotny wybór
                        id="traits-autocomplete"
                        options={traits} // Lista dostępnych cech
                        value={formData.traits} // Aktualnie wybrane cechy
                        onChange={onTraitsChange} // Dedykowany handler
                        getOptionDisabled={(option) => // Wyłącz opcję, jeśli limit osiągnięty i opcja nie jest już wybrana
                            formData.traits.length >= maxTraits && !formData.traits.includes(option)
                        }
                        renderTags={(value, getTagProps) => // Jak renderować wybrane tagi (Chip)
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => ( // Jak renderować pole tekstowe
                            <TextField
                                {...params}
                                variant="outlined"
                                label={`Cechy (max ${maxTraits})`}
                                placeholder="Wybierz cechy..."
                                InputLabelProps={{ style: { fontSize: '1.1rem' } }}
                                // Można dodać style dla inputu autocomplete
                            />
                        )}
                        className="form-field"
                        // Opcjonalnie: dostosuj style Autocomplete przez sx
                    />


                    {/* Opis */}
                    <TextField
                        label="Opis"
                        name="description"
                        value={formData.description}
                        onChange={onFormChange}
                        multiline
                        rows={4}
                        fullWidth
                        required // Dodajmy wymagalność
                        className="form-field"
                        InputProps={{ style: { fontSize: '1.1rem', padding: '8px' } }}
                        InputLabelProps={{ style: { fontSize: '1.1rem' } }}
                    />
                </Box>
            </DialogContent>
            <DialogActions className="modal-actions">
                <Button onClick={onClose} className="cancel-button">
                    Anuluj
                </Button>
                <Button
                    onClick={onSubmit}
                    // Zaktualizuj warunek disabled o nowe wymagane pola
                    disabled={!formData.name || !formData.preview || !formData.category || !formData.age || !formData.description}
                    variant="contained"
                    className="submit-button"
                >
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    );
}
import React from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Button,
    Grid,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const PetFilter = ({ filters, onChange, breeds, shelters, speciesList, tagsList }) => {
    const handleInput = (field) => (event) => {
        const value = event.target.value;
        onChange({ ...filters, [field]: value });
    };

    const handleReset = () => {
        onChange({
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
    };

    return (
        <Box mb={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
            <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Imię"
                        value={filters.name}
                        onChange={handleInput('name')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        label="Wiek"
                        value={filters.age}
                        onChange={handleInput('age')}
                        placeholder="np. 3-5"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        label="Stan zdrowia"
                        value={filters.condition}
                        onChange={handleInput('condition')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Rasa</InputLabel>
                        <Select
                            value={filters.id_breed}
                            onChange={handleInput('id_breed')}
                            label="Rasa"
                        >
                            <MenuItem value="">Dowolna</MenuItem>
                            {breeds.map(b => (
                                <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Gatunek</InputLabel>
                        <Select
                            value={filters.id_species}
                            onChange={handleInput('id_species')}
                            label="Gatunek"
                        >
                            <MenuItem value="">Dowolny</MenuItem>
                            {speciesList.map(s => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Schronisko</InputLabel>
                        <Select
                            value={filters.id_shelter}
                            onChange={handleInput('id_shelter')}
                            label="Schronisko"
                        >
                            <MenuItem value="">Dowolne</MenuItem>
                            {shelters.map(s => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Płeć</InputLabel>
                        <Select
                            value={filters.sex}
                            onChange={handleInput('sex')}
                            label="Płeć"
                        >
                            <MenuItem value="">Dowolna</MenuItem>
                            <MenuItem value="Samiec">Samiec</MenuItem>
                            <MenuItem value="Samica">Samica</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.status}
                            onChange={handleInput('status')}
                            label="Status"
                        >
                            <MenuItem value="">Dowolny</MenuItem>
                            <MenuItem value="Do oddania">Do oddania</MenuItem>
                            <MenuItem value="Adopted">Adopted</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Tagi</InputLabel>
                        <Select
                            multiple
                            value={filters.tags}
                            onChange={handleInput('tags')}
                            input={<OutlinedInput label="Tagi" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {tagsList.map(tag => (
                                <MenuItem key={tag.id} value={tag.id}>
                                    <Checkbox checked={filters.tags.includes(tag.id)} />
                                    <ListItemText primary={tag.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Button variant="outlined" fullWidth onClick={handleReset}>
                        Resetuj
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PetFilter;
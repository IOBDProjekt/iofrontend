import React, { useState } from 'react';
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
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const PetFilter = ({
                       filters,
                       onChange,
                       breeds,
                       shelters,
                       speciesList,
                       tagsList,
                       sexList,
                       statusList,
                   }) => {
    const [open, setOpen] = useState(true);
    const handleToggle = () => setOpen(prev => !prev);

    const handleInput = (field) => (event) => {
        const value = event.target.value;
        onChange({
            ...filters,
            [field]: value,
        });
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
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Filtry</Typography>
                <IconButton onClick={handleToggle} size="small">
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box mt={2}>
                    <Grid container spacing={2} alignItems="flex-end">
                        {/* Imię */}
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Imię"
                                value={filters.name}
                                onChange={handleInput('name')}
                                fullWidth
                            />
                        </Grid>

                        {/* Wiek */}
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                label="Wiek"
                                value={filters.age}
                                onChange={handleInput('age')}
                                placeholder="np. 3-5"
                                fullWidth
                            />
                        </Grid>

                        {/* Stan zdrowia */}
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                label="Stan zdrowia"
                                value={filters.condition}
                                onChange={handleInput('condition')}
                                fullWidth
                            />
                        </Grid>

                        {/* Rasa (jednokrotny wybór) */}
                        <Grid item xs={6} sm={4} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Rasa</InputLabel>
                                <Select
                                    value={filters.id_breed}
                                    onChange={handleInput('id_breed')}
                                    label="Rasa"
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="">Dowolna</MenuItem>
                                    {Array.isArray(breeds) &&
                                        breeds.map((b) => (
                                            <MenuItem key={b.id_breed} value={b.id_breed}>
                                                {b.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Gatunek (jednokrotny wybór) */}
                        <Grid item xs={6} sm={4} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Gatunek</InputLabel>
                                <Select
                                    value={filters.id_species}
                                    onChange={handleInput('id_species')}
                                    label="Gatunek"
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="">Dowolny</MenuItem>
                                    {Array.isArray(speciesList) &&
                                        speciesList.map((s) => (
                                            <MenuItem key={s.id_species} value={s.id_species}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Schronisko (jednokrotny wybór) */}
                        <Grid item xs={6} sm={4} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Schronisko</InputLabel>
                                <Select
                                    value={filters.id_shelter}
                                    onChange={handleInput('id_shelter')}
                                    label="Schronisko"
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="">Dowolne</MenuItem>
                                    {Array.isArray(shelters) &&
                                        shelters.map((s) => (
                                            <MenuItem key={s.id_shelter} value={s.id_shelter}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Płeć (jednokrotny wybór) */}
                        <Grid item xs={6} sm={3} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Płeć</InputLabel>
                                <Select
                                    value={filters.sex}
                                    onChange={handleInput('sex')}
                                    label="Płeć"
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="">Dowolna</MenuItem>
                                    {Array.isArray(sexList) &&
                                        sexList.map((sexValue) => (
                                            <MenuItem key={sexValue} value={sexValue}>
                                                {sexValue}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Status (jednokrotny wybór) */}
                        <Grid item xs={6} sm={3} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status}
                                    onChange={handleInput('status')}
                                    label="Status"
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="">Dowolny</MenuItem>
                                    {Array.isArray(statusList) &&
                                        statusList.map((statusValue) => (
                                            <MenuItem key={statusValue} value={statusValue}>
                                                {statusValue}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Tagi (wielokrotny wybór) */}
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Tagi</InputLabel>
                                <Select
                                    multiple
                                    value={filters.tags}
                                    onChange={handleInput('tags')}
                                    input={<OutlinedInput label="Tagi" />}
                                    renderValue={(selected) =>
                                        (Array.isArray(selected) ? selected.join(', ') : '')
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {Array.isArray(tagsList) &&
                                        tagsList.map((tag) => (
                                            <MenuItem key={tag.id_tag} value={tag.character}>
                                                <Checkbox checked={filters.tags.includes(tag.character)} />
                                                <ListItemText primary={tag.character} />
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Reset */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Button variant="outlined" fullWidth onClick={handleReset}>
                                Resetuj
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </Box>
    );
};

export default PetFilter;
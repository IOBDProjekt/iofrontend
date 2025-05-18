import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Autocomplete,
    Chip
} from '@mui/material';

export default function FilterControls({
                                           categories,
                                           ages,
                                           traits,
                                           selectedCategory,
                                           selectedAge,
                                           selectedTraits,
                                           onCategoryChange,
                                           onAgeChange,
                                           onTraitsChange
                                       }) {
    return (
        <Box className="filter-controls-container">
            <FormControl sx={{ minWidth: 200 }}> {/* Zwiększono minWidth */}
                <InputLabel id="filter-category-label">Kategoria</InputLabel>
                <Select
                    labelId="filter-category-label"
                    id="filter-category-select"
                    value={selectedCategory}
                    label="Kategoria"
                    onChange={onCategoryChange}
                >
                    <MenuItem value="">
                        <em>Wszystkie</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}> {/* Zwiększono minWidth */}
                <InputLabel id="filter-age-label">Wiek</InputLabel>
                <Select
                    labelId="filter-age-label"
                    id="filter-age-select"
                    value={selectedAge}
                    label="Wiek"
                    onChange={onAgeChange}
                >
                    <MenuItem value="">
                        <em>Wszystkie</em>
                    </MenuItem>
                    {ages.map((age) => (
                        <MenuItem key={age} value={age}>
                            {age}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Autocomplete
                multiple
                id="filter-traits-autocomplete"
                options={traits}
                value={selectedTraits}
                onChange={onTraitsChange}
                sx={{ minWidth: 350, flexGrow: 1 }} // Zwiększono minWidth
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} /> // Usunięto size="small"
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Filtruj Cechy"
                        placeholder="Wybierz cechy..."
                    />
                )}
            />
        </Box>
    );
}
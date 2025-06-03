export function parseAgeFilter(ageStr) {
    const s = ageStr.trim();
    const rangeMatch = s.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
        return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10) };
    }
    const plusMatch = s.match(/^(\d+)\s*\+$/);
    if (plusMatch) {
        return { min: parseInt(plusMatch[1], 10), max: Infinity };
    }
    const single = parseInt(s, 10);
    if (!isNaN(single)) {
        return { min: single, max: single };
    }
    return null;
}

export function filterPets(pets, filters, tagsList) {
    return pets.filter(p => {
        if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) {
            return false;
        }

        if (filters.age) {
            const filterRange = parseAgeFilter(filters.age);
            if (!filterRange) return false;

            const petAge = parseInt(p.age, 10);
            if (isNaN(petAge)) return false;
            if (filterRange.min === filterRange.max) {
                if (petAge !== filterRange.min) return false;
            } else {
                if (petAge < filterRange.min || petAge > filterRange.max) return false;
            }
        }

        if (filters.condition && p.condition !== filters.condition) {
            return false;
        }

        if (filters.id_breed && p.id_breed !== Number(filters.id_breed)) return false;
        if (filters.id_species && p.id_species !== Number(filters.id_species)) return false;
        if (filters.id_shelter && p.id_shelter !== Number(filters.id_shelter)) return false;
        if (filters.sex && p.sex !== filters.sex) return false;
        if (filters.status && p.status !== filters.status) return false;

        if (Array.isArray(filters.tags) && filters.tags.length > 0) {
            const petTagCharacters = Array.isArray(p.tags)
                ? p.tags
                    .map(rawId => {
                        const idAsString = String(rawId);
                        const found = tagsList.find(t => t.id_tag === idAsString);
                        return found ? found.character : null;
                    })
                    .filter(Boolean)
                : [];

            const allMatch = filters.tags.every(charName =>
                petTagCharacters.includes(charName)
            );
            if (!allMatch) {
                return false;
            }
        }
        return true;
    });
}

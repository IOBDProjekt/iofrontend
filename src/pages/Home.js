import React from "react";
import { Grid, Box, Pagination } from "@mui/material";
import usePetApi from "../hooks/usePetApi";
import { usePetFilters } from "../hooks/usePetFilters";
import usePagination from "../hooks/usePagination";
import PetItem from "../assets/Pet/PetItem";
import PetFilter from "../assets/Pet/PetFilter";
import { Loading } from "../assets/Loading";
import { ErrorDisplay } from "../assets/ErrorDisplay";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { pets: allPets, loading: petsLoading, error: petsError } = usePetApi();
  const { refreshFavourites } = useUser();
  const {
    filters,
    setFilters,
    breeds,
    speciesList,
    shelters,
    tagsList,
    sexList,
    statusList,
    filteredPets,
    loading: filtersLoading,
    error: filtersError,
  } = usePetFilters(allPets);

  const [favourites, setFavourites] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const url = process.env.REACT_APP_API_BASE_URL + "/favourite";
    console.log("Ładowanie ulubionych z:", url);

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => setFavourites(res.data.favourites))
      .catch((err) => console.error("Błąd ładowania ulubionych", err));
  }, []);

  const handleFavoriteToggle = async (petId) => {
    const isFav = favourites.some((f) => f.id_pet === petId);

    try {
      if (isFav) {
        await axios.delete(`${API_BASE}/favourite/${petId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setFavourites((favs) => favs.filter((f) => f.id_pet !== petId));
      } else {
        const res = await axios.post(
          `${API_BASE}/favourite`,
          { id_pet: petId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setFavourites((favs) => [...favs, res.data.favourite]);
      }
    } catch (error) {
      console.error("Błąd przy ulubionych:", error);
    }
    refreshFavourites();
  };

  const anyLoading =
    petsLoading ||
    filtersLoading.breeds ||
    filtersLoading.species ||
    filtersLoading.shelters ||
    filtersLoading.tags;

  const anyError =
    petsError ||
    filtersError.breeds ||
    filtersError.species ||
    filtersError.shelters ||
    filtersError.tags;

  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(
    filteredPets,
    12
  );

  if (anyLoading) return <Loading />;
  if (anyError) return <ErrorDisplay message={String(anyError)} />;

  return (
    <Box p={2}>
      <PetFilter
        filters={filters}
        onChange={setFilters}
        breeds={breeds}
        speciesList={speciesList}
        shelters={shelters}
        tagsList={tagsList}
        sexList={sexList}
        statusList={statusList}
      />

      <Grid container spacing={2}>
        {paginatedItems.map((pet) => (
          <Grid item key={pet.id_pet} xs={12} sm={6} md={4} lg={3}>
            <PetItem
              pet={pet}
              tagsList={tagsList}
              breeds={breeds}
              speciesList={speciesList}
              shelters={shelters}
              onFavoriteToggle={() => handleFavoriteToggle(pet.id_pet)}
              isFavourite={favourites.some((f) => f.id_pet === pet.id_pet)}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

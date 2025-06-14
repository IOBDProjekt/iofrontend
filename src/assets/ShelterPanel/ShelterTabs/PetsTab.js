import { useEffect, useState } from "react";
import api from "../../../api";
import { getImageUrl } from "../../../utils/imageUtils";
import ShelterPetModal from "../ShelterModals/ShelterPetModal";

const PetsTab = ({ pets, updatePets, shelterId }) => {
	const [modalErrors, setModalErrors] = useState([]);
	const [species, setSpecies] = useState([]);
	const [breeds, setBreeds] = useState([]);
	const [tags, setTags] = useState([]);
	const [imageVersion, setImageVersion] = useState(0);

	const handleAddPet = async (petData, image) => {
		try {
			const meResponse = await api.get("/auth/me");
			const currentUserId = meResponse.data.id_user;

			petData.id_user = currentUserId;
			petData.id_shelter = shelterId;

			const response = await api.post("/pet", petData);
			const petID = response.data.pet.id_pet;

			if (image !== null) {
				const formData = new FormData();
				formData.append("image", image);

				const imageResponse = await api.post("/image", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				const id_image = imageResponse.data.id_image;

				await api.put("/pet/" + petID, { id_image: id_image });
			}

			setModalErrors([]);
			updatePets();
			return true;
		} catch (error) {
			const msgs =
				error?.response?.data?.messages || [error?.response?.data?.message] ||
				[];
			setModalErrors((prev) => [...prev, ...msgs]);
			return false;
		}
	};

	const handleEditPet = async (petData, image) => {
		try {
			await api.put("/pet/" + petData.id_pet, petData);

			if (image !== null) {
				const formData = new FormData();
				formData.append("image", image);

				if (petData.id_image !== null) {
					await api.put("/image/" + petData.id_image, formData, {
						headers: { "Content-Type": "multipart/form-data" },
					});
				} else {
					const imageResponse = await api.post("/image", formData, {
						headers: { "Content-Type": "multipart/form-data" },
					});

					const newImageId = imageResponse.data.id_image;

					await api.put("/pet/" + petData.id_pet, { id_image: newImageId });
				}

				setImageVersion((prev) => prev + 1);
			}

			setModalErrors([]);
			updatePets();
			return true;
		} catch (error) {
			const msgs =
				error?.response?.data?.messages || [error?.response?.data?.message] ||
				[];
			setModalErrors((prev) => [...prev, ...msgs]);
			return false;
		}
	};

	useEffect(() => {
		const fetchSpecies = async () => {
			try {
				const response = await api.get("/species");
				setSpecies(response.data.species);
			} catch (error) {
				console.error("Error fetching species:", error);
			}
		};
		fetchSpecies();
	}, []);

	useEffect(() => {
		const fetchBreeds = async () => {
			try {
				const response = await api.get("/breed");
				setBreeds(response.data.breeds);
			} catch (error) {
				console.error("Error fetching breeds:", error);
			}
		};
		fetchBreeds();
	}, []);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const response = await api.get("/tag");
				setTags(response.data.tags);
			} catch (error) {
				console.error("Error fetching tags:", error);
			}
		};
		fetchTags();
	}, []);

	return (
		<div className="shelter-tab-content">
			<h3>Lista ogłoszeń</h3>
			<ShelterPetModal
				title={"Dodaj zwierzaka"}
				buttonText={"Dodaj zwierzaka"}
				errors={modalErrors}
				setErrors={setModalErrors}
				onSubmit={handleAddPet}
				species={species}
				breeds={breeds}
				tags={tags}
			/>
			<div className="table-container">
				<table className="shelter-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Obrazek</th>
							<th>Imię</th>
							<th>Gatunek</th>
							<th>Rasa</th>
							<th>Wiek</th>
							<th>Płeć</th>
							<th>Stan</th>
							<th>Status</th>
							<th>Tagi</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{pets &&
							pets.map((pet) => (
								<tr key={pet.id_pet}>
									<td>{pet.id_pet}</td>
									<td className="shelter-tab-pet-image">
										<img
											src={getImageUrl(pet.id_image, imageVersion)}
											alt="Zdjęcie"
											style={{ width: "100px", height: "75px" }}
										/>
									</td>
									<td>{pet.name}</td>
									<td>{pet.species.name}</td>
									<td>{pet.breed?.name}</td>
									<td>{pet.age}</td>
									<td>{pet.sex}</td>
									<td>{pet.condition}</td>
									<td>{pet.status}</td>
									<td>{pet.tags.map((tag) => tag.character).join(", ")}</td>
									<td>
										<ShelterPetModal
											title={"Edytuj zwierzaka"}
											buttonText={"Edytuj"}
											errors={modalErrors}
											setErrors={setModalErrors}
											onSubmit={handleEditPet}
											petInfo={pet}
											species={species}
											breeds={breeds}
											tags={tags}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PetsTab;


import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";

import "./ShelterModals.css";

export default function ShelterPetModal({
												title,
												buttonText,
												onSubmit,
												errors,
												setErrors,
												type,
												petInfo,
												species,
												breeds,
												tags,
											}) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setErrors((prev) => []);
		setOpen(false);
	};

	const [name, setName] = useState("");
	const [idSpecies, setIdSpecies] = useState("");
	const [idBreed, setIdBreed] = useState("");
	const [age, setAge] = useState("");
	const [sex, setSex] = useState("");
	const [condition, setCondition] = useState("");
	const [tagIDs, setTagIDs] = useState([]);
	const [status, setStatus] = useState("");
	const [image, setImage] = useState(null);

	const filteredBreeds = breeds.filter((b) => b.id_species === idSpecies);
	const handleSubmit = async () => {
		var idBreed_ = idBreed;
		if (!filteredBreeds.map((b) => b.id_breed).includes(idBreed))
			idBreed_ = null;
		const data = {
			id_pet: petInfo?.id_pet,
			name: name,
			id_species: idSpecies,
			id_breed: idBreed_,
			age: age,
			sex: sex,
			condition: condition,
			status: status,
			tagIDs: tagIDs.filter((t) => t != null),
			id_image: petInfo?.id_image,
		};
		const result = await onSubmit(data, image);
		setOpen(!result);
	};

	useEffect(() => {
		if (open && petInfo) {
			setName(petInfo.name || "");
			setIdSpecies(petInfo.id_species || undefined);
			setIdBreed(petInfo.id_breed || undefined);
			setAge(petInfo.age || "");
			setSex(petInfo.sex || "");
			setCondition(petInfo.condition || "");
			setTagIDs(petInfo.tags.map((b) => b.id_tag) || []);
			setStatus(petInfo.status || "");
		}
	}, [open]);

	return (
		<>
			<button
				className={`${type == "edit" && "shelter-modal-edit-button"}`}
				onClick={handleOpen}
			>
				{buttonText}
			</button>
			<Modal open={open} onClose={handleClose}>
				<div className={`shelter-modal`}>
					<h4>{title}</h4>
					<div className="shelter-modal-errors">
						{errors.length > 0 &&
							errors.map((e, i) => <span key={i}>{e}</span>)}
					</div>
					<div className="shelter-modal-inputs">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Imię zwierzaka"
						/>
						<FormControl fullWidth>
							<InputLabel id="species-label">Gatunek</InputLabel>
							<Select
								value={idSpecies}
								onChange={(e) => setIdSpecies(e.target.value)}
								label="Gatunek"
							>
								{species.map((s) => (
									<MenuItem key={s.id_species} value={s.id_species}>
										{s.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id="breed-label">Breed</InputLabel>
							<Select
								value={idBreed}
								onChange={(e) => setIdBreed(e.target.value)}
								label="Rasa"
								disabled={filteredBreeds.length === 0 || !idSpecies}
							>
								{filteredBreeds.map((s) => (
									<MenuItem key={s.id_breed} value={s.id_breed}>
										{s.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id="tags-label">Tagi</InputLabel>
							<Select
								multiple
								value={tagIDs}
								onChange={(e) => setTagIDs(e.target.value)}
								label="Tagi"
							>
								{tags.map((s) => (
									<MenuItem key={s.id_tag} value={s.id_tag}>
										{s.character}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<input
							value={age}
							onChange={(e) => setAge(e.target.value)}
							placeholder="Wiek"
						/>
						<FormControl fullWidth>
							<InputLabel id="sex-label">Płeć</InputLabel>
							<Select
								value={sex}
								onChange={(e) => setSex(e.target.value)}
								label="Płeć"
							>
								<MenuItem value={"Samiec"}>Samiec</MenuItem>
								<MenuItem value={"Samica"}>Samica</MenuItem>
							</Select>
						</FormControl>
						<input
							value={condition}
							onChange={(e) => setCondition(e.target.value)}
							placeholder="Stan zwierzaka"
						/>
						<FormControl fullWidth>
							<InputLabel id="sex-label">Status Zwierzaka</InputLabel>
							<Select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								label="Status Zwierzaka"
							>
								<MenuItem value={"Do oddania"}>Do oddania</MenuItem>
								<MenuItem value={"Oddany"}>Oddany</MenuItem>
							</Select>
						</FormControl>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setImage(e.target.files[0])}
						/>{" "}
					</div>
					<button onClick={handleSubmit} className="shelter-modal-submit">
						Wyślij
					</button>
				</div>
			</Modal>
		</>
	);
}
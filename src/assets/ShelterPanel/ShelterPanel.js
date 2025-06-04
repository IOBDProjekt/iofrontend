import React, { useEffect, useState } from "react";

import api from "../../api";
import ShelterTabs from "./ShelterTabs";
import PetsTab from "./ShelterTabs/PetsTab";
import ChatTab from "./ShelterTabs/ChatTab";
import FormsTab from "./ShelterTabs/FormsTab";
import "./ShelterPanel.css";

const ShelterPanel = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [pets, setPets] = useState([]);

	const fetchAllPets = async () => {
		try {
			const id_response = await api.get("/auth/me");
			const response = await api.get(
				"/pet/shelter/" + id_response?.data?.id_user,
			);
			setPets((prev) => [...response?.data?.pets]);
		} catch (error) {}
	};

	const tabs = [
		<PetsTab pets={pets} updatePets={fetchAllPets} />,
		<ChatTab />,
		<FormsTab />,
	];

	useEffect(() => {
		fetchAllPets();
	}, []);

	return (
		<div className="shelter-panel">
			<aside>
				<h3>Panel schroniska</h3>
				<ShelterTabs changeTab={setActiveTab} />
			</aside>
			{tabs[activeTab]}
		</div>
	);
};

export default ShelterPanel;

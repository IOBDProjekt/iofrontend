// ShelterPanel.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import ShelterTabs from "./ShelterTabs";
import PetsTab from "./ShelterTabs/PetsTab";
import ChatTab from "./ShelterTabs/ChatTab";
import FormsTab from "./ShelterTabs/FormsTab";
import "./ShelterPanel.css";
import "./ShelterTabs/ShelterTabsTable.css";

const ShelterPanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [pets, setPets] = useState([]);
    const [shelterId, setShelterId] = useState(null);

    const fetchAllPets = async () => {
        try {
            // 1) pobieramy zalogowanego usera
            const meResponse = await api.get("/auth/me");
            const userId = meResponse.data.id_user;

            // 2) pobieramy wszystkie pets dla tego usera
            const resp = await api.get("/pet/shelter/" + userId);
            const petsArray = resp.data.pets;

            setPets(petsArray);

            // 3) jeśli mamy co najmniej jeden pet, wyciągamy jego id_shelter
            if (petsArray.length > 0) {
                setShelterId(petsArray[0].id_shelter);
            }
        } catch (error) {
            console.error("Błąd przy fetchAllPets:", error);
        }
    };

    useEffect(() => {
        fetchAllPets();
    }, []);

    const tabs = [
        // przekazujemy shelterId do PetsTab
        <PetsTab pets={pets} updatePets={fetchAllPets} shelterId={shelterId} />,
        <ChatTab />,
        <FormsTab />,
    ];

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

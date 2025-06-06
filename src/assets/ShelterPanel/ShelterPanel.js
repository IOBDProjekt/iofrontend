import React, { useEffect, useState } from "react";
import api from "../../api";
import ShelterTabs from "./ShelterTabs";
import PetsTab from "./ShelterTabs/PetsTab";
import ChatTab from "./ShelterTabs/ChatTab";
import "./ShelterPanel.css";
import "./ShelterTabs/ShelterTabsTable.css";
import AdoptionFormsTab from "./ShelterTabs/AdoptionFormsTab";

const ShelterPanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [pets, setPets] = useState([]);
    const [shelterId, setShelterId] = useState(null);

    const fetchAllPets = async () => {
        try {
            const meResponse = await api.get("/auth/me");
            const userId = meResponse.data.id_user;

            const resp = await api.get("/pet/shelter/" + userId);
            const petsArray = resp.data.pets;

            setPets(petsArray);

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
        <PetsTab pets={pets} updatePets={fetchAllPets} shelterId={shelterId} />,
        <ChatTab />,
        <AdoptionFormsTab />,
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
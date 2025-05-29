import React, { useEffect, useState } from "react";
import AdminTabs from "./AdminTabs";

import UsersTab from "./AdminTabs/UsersTab";
import ShelterAccountsTab from "./AdminTabs/ShelterAccountsTab";
import SheltersTab from "./AdminTabs/SheltersTab";
import "./AdminTabs/AdminTabsTable.css";
import api from "../../api";
import ShelterModal from "./AdminModals/ShelterModal";

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [shelters, setShelters] = useState([]);
    const [shelterInfo, setShelterInfo] = useState({});
    const [modalErrors, setModalErrors] = useState([]);
    const [modalSuccess, setModalSuccess] = useState([]);

    const handleAddShelter = async (shelterData) => {
        try {
            const response = await api.post("/shelter", {
                name: shelterData.name,
                city: shelterData.city,
                number: shelterData.number,
                email: shelterData.email,
            });

            setModalErrors((prev) => []);
            setModalSuccess((prev) => [response.data["message"]]);
            setShelters((prev) => [...prev, response.data["newShelter"]]);

            return true;
        } catch (error) {
            setModalErrors((prev) => [...(error?.response?.data?.messages || [error?.response?.data?.message] || [])]);
            return false;
        }
    };

    const tabs = [
        <UsersTab />,
        <ShelterAccountsTab />,
        <SheltersTab
            createShelterButton={
                <ShelterModal
                    errors={modalErrors}
                    title={"Zarejestruj nowe schronisko"}
                    updateShelterInfo={setShelterInfo}
                    onSubmit={handleAddShelter}
                    setErrors={setModalErrors}
                    success={modalSuccess}
                    setSuccess={setModalSuccess}
                />
            }
            shelters={shelters}
            setShelters={setShelters}
        />,
    ];

    const fetchAllShelters = async () => {
        try {
            const response = await api.get("/shelter");
            setShelters((prev) => [...response?.data?.shelters]);
        } catch (error) {}
    };

    useEffect(() => {
        fetchAllShelters();
    }, []);

    return (
        <div className="admin-panel">
            <aside>
                <h3>Panel administratora</h3>
                <AdminTabs changeTab={setActiveTab} />
            </aside>
            {tabs[activeTab]}
        </div>
    );
};

export default AdminPanel;

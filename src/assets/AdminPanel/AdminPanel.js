import React, { useEffect, useState } from "react";
import AdminTabs from "./AdminTabs";

import UsersTab from "./AdminTabs/UsersTab";
import ShelterAccountsTab from "./AdminTabs/ShelterAccountsTab";
import SheltersTab from "./AdminTabs/SheltersTab";
import "./AdminTabs/AdminTabsTable.css";
import api from "../../api";

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [shelters, setShelters] = useState([]);
    const [shelterAccounts, setShelterAccounts] = useState([]);

    const fetchAllShelters = async () => {
        try {
            const response = await api.get("/shelter");
            setShelters((prev) => [...response?.data?.shelters]);
        } catch (error) {}
    };

    const fetchAllShelterAccount = async () => {
        try {
            const response = await api.get("/auth/shelter-accounts");
            setShelterAccounts([...response?.data?.shelterAccounts]);
        } catch (error) {}
    };

    const tabs = [
        <ShelterAccountsTab accounts={shelterAccounts} updateAccounts={fetchAllShelterAccount} />,
        <SheltersTab
            shelters={shelters}
            updateShelters={fetchAllShelters}
            accounts={shelterAccounts}
            updateAccounts={fetchAllShelterAccount}
        />,
    ];

    useEffect(() => {
        fetchAllShelters();
        fetchAllShelterAccount();
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

import React, { useEffect, useState } from "react";

import api from "../../api";
import ShelterTabs from "./ShelterTabs";
import PetsTab from "./ShelterTabs/PetsTab";
import ChatTab from "./ShelterTabs/ChatTab";
import FormsTab from "./ShelterTabs/FormsTab";
import "./ShelterPanel.css";

const ShelterPanel = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [<PetsTab />, <ChatTab />, <FormsTab />];

    useEffect(() => {}, []);

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

import React from "react";

const AdminTabs = ({ changeTab }) => {
    const tabs = ["Konta Schronisk", "Schroniska"];

    return (
        <ul className="admin-tabs">
            {tabs.map((tab, index) => {
                return (
                    <li key={index} onClick={() => changeTab(index)}>
                        <p>{tab}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default AdminTabs;

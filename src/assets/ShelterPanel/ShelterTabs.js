import React from "react";

const ShelterTabs = ({ changeTab }) => {
    const tabs = ["Ogłoszenia", "Czat", "Wnioski o adopcje"];

    return (
        <ul className="shelter-tabs">
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

export default ShelterTabs;

import { useEffect, useState } from "react";
import api from "../../../api";

const SheltersTab = ({ shelters, setShelters, createShelterButton }) => {
    return (
        <div className="admin-tab-content">
            <h3>Lista aktywnych schronisk</h3>
            {createShelterButton}
            <div className="table-container">
                <table className="shelter-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa schroniska</th>
                            <th>Miasto</th>
                            <th>Telefon</th>
                            <th>Email</th>
                            <th>Opiekun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shelters.map((shelter) => (
                            <tr key={shelter.id_shelter}>
                                <td>{shelter.id_shelter}</td>
                                <td>{shelter.name}</td>
                                <td>{shelter.city}</td>
                                <td>{shelter.number}</td>
                                <td>{shelter.email}</td>
                                <td>{shelter.user && <>{`${shelter?.user?.firstname} ${shelter?.user?.lastname}`}</>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SheltersTab;

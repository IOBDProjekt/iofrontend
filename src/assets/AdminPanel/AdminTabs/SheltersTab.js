import { useEffect, useState } from "react";
import api from "../../../api";
import ShelterModal from "../AdminModals/ShelterModal";

const SheltersTab = ({ shelters, updateShelters, accounts, updateAccounts }) => {
    const [modalErrors, setModalErrors] = useState([]);
    const [activeShelterID, setActiveShelterID] = useState(null);

    const handleAddShelter = async (shelterData) => {
        try {
            await api.post("/shelter", {
                name: shelterData.name,
                city: shelterData.city,
                number: shelterData.number,
                email: shelterData.email,
            });

            setModalErrors((prev) => []);
            updateShelters();

            return true;
        } catch (error) {
            setModalErrors((prev) => [...(error?.response?.data?.messages || [error?.response?.data?.message] || [])]);
            return false;
        }
    };

    const handleEditShelter = async (shelterData) => {
        try {
            await api.put(`/shelter/${shelterData["id_shelter"]}`, shelterData);

            setModalErrors([]);
            updateShelters();

            return true;
        } catch (error) {
            setModalErrors((prev) => [...(error?.response?.data?.messages || [error?.response?.data?.message] || [])]);
            return false;
        }
    };

    const handleRemoveModerator = async (shelterID) => {
        try {
            await api.post("/shelter/assign", {
                id_shelter: shelterID,
                id_user: null,
            });
            setTimeout(updateShelters, 100);
        } catch (error) {}
    };

    const handleAssignModerator = async (shelterID, accountID) => {
        try {
            await api.post("/shelter/assign", {
                id_shelter: shelterID,
                id_user: accountID,
            });
            setTimeout(updateShelters, 100);
        } catch (error) {}
    };

    const openAssignModeratorPopup = (shelterID) => {
        setActiveShelterID((prev) => {
            if (prev === shelterID) return null;
            else return shelterID;
        });
    };

    const shelterModerator = (shelter) => {
        if (shelter.user) {
            return (
                <>
                    <span>{`${shelter?.user?.firstname} ${shelter?.user?.lastname}`}</span>
                    <p
                        onClick={() => handleRemoveModerator(shelter["id_shelter"])}
                        className="change-shelter-account remove-shelter-account"
                    >
                        Usuń
                    </p>
                </>
            );
        } else {
            return (
                <div className="sheler-moderator-update">
                    <p
                        onClick={() => openAssignModeratorPopup(shelter["id_shelter"])}
                        className="change-shelter-account assign-shelter-account"
                    >
                        Dodaj
                    </p>
                    <div
                        className={`shelter-assign-popup ${
                            activeShelterID === shelter["id_shelter"] ? "shelter-assign-popup-active" : ""
                        }`}
                    >
                        <ul>
                            {accounts.map((account, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleAssignModerator(shelter["id_shelter"], account["id_user"])}
                                >
                                    {account?.firstname} {account?.lastname}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="admin-tab-content">
            <h3>Lista aktywnych schronisk</h3>
            <ShelterModal
                title={"Zarejestruj nowe schronisko"}
                buttonText={"Zarejestruj nowe schronisko"}
                errors={modalErrors}
                setErrors={setModalErrors}
                onSubmit={handleAddShelter}
            />
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shelters &&
                            shelters.map((shelter) => (
                                <tr key={shelter.id_shelter}>
                                    <td>{shelter.id_shelter}</td>
                                    <td className="shelter-name">{shelter.name}</td>
                                    <td>{shelter.city}</td>
                                    <td>{shelter.number}</td>
                                    <td className="shelter-email">{shelter.email}</td>
                                    <td className="shelter-moderator">{shelterModerator(shelter)}</td>
                                    <td>
                                        {
                                            <ShelterModal
                                                title={"Edycja schroniska"}
                                                type={"edit"}
                                                buttonText={"Edytuj"}
                                                errors={modalErrors}
                                                shelterInfo={shelter}
                                                setErrors={setModalErrors}
                                                onSubmit={handleEditShelter}
                                            />
                                        }
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SheltersTab;

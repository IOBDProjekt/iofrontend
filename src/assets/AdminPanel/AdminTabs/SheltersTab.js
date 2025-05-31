import { useEffect, useState } from "react";
import api from "../../../api";
import ShelterModal from "../AdminModals/ShelterModal";

const SheltersTab = ({ shelters, updateShelters }) => {
    const [modalErrors, setModalErrors] = useState([]);

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
                                    <td>{shelter.email}</td>
                                    <td>{shelter.user && <>{`${shelter?.user?.firstname} ${shelter?.user?.lastname}`}</>}</td>
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

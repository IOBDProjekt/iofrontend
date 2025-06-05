import { useEffect, useState } from "react";
import api from "../../../api";
import ShelterAccountModal from "../AdminModals/ShelterAccountModal";

const SheltersTab = ({ accounts, updateAccounts }) => {
    const [modalErrors, setModalErrors] = useState([]);

    const handleAddAccount = async (accountData) => {
        try {
            await api.post("/auth/register-shelter", accountData);

            setModalErrors([]);
            updateAccounts();

            return true;
        } catch (error) {
            setModalErrors((prev) => [...(error?.response?.data?.messages || [error?.response?.data?.message] || [])]);
            return false;
        }
    };

    const handleEditAccount = async (accountData) => {
        try {
            await api.put(`/auth/shelter-accounts/${accountData["id_user"]}`, accountData);

            setModalErrors([]);
            updateAccounts();

            return true;
        } catch (error) {
            setModalErrors((prev) => [...(error?.response?.data?.messages || [error?.response?.data?.message] || [])]);
            return false;
        }
    };

    return (
        <div className="admin-tab-content">
            <h3>Lista kont moderatorów schronisk</h3>
            <ShelterAccountModal
                title={"Zarejestruj nowego moderatora"}
                buttonText={"Zarejestruj nowego moderatora"}
                errors={modalErrors}
                setErrors={setModalErrors}
                onSubmit={handleAddAccount}
            />
            <div className="table-container">
                <table className="shelter-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Miejscowość</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts &&
                            accounts.map((account) => (
                                <tr key={account?.id_user}>
                                    <td>{account?.id_user}</td>
                                    <td>{account?.firstname}</td>
                                    <td>{account?.lastname}</td>
                                    <td>{account?.city}</td>
                                    <td>{account?.email}</td>
                                    <td>
                                        {
                                            <ShelterAccountModal
                                                title={"Edycja moderatora"}
                                                type={"edit"}
                                                buttonText={"Edytuj"}
                                                errors={modalErrors}
                                                setErrors={setModalErrors}
                                                onSubmit={handleEditAccount}
                                                accountInfo={account}
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

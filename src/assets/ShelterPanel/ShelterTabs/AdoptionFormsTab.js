import { useEffect, useState } from "react";
import api from "../../../api";

const AdoptionFormsTab = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await api.get("/adoption");
                setForms(response.data.forms);
            } catch (error) {}
        };

        fetchForms();
    }, []);

    return (
        <div className="shelter-tab-content">
            <h3>Lista wniosków o adopcje</h3>
            <div className="table-container">
                <table className="shelter-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Wnioskujący</th>
                            <th>ID Zwierzęcia</th>
                            <th>PESEL</th>
                            <th>Motywacja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map((form) => {
                            return (
                                <tr key={form?.id_aform}>
                                    <td>{form?.id_aform}</td>
                                    <td>
                                        {form?.adopter?.firstname} {form?.adopter?.lastname} &lt;{form?.adopter?.email}
                                        &gt;
                                    </td>
                                    <td>{form?.id_pet}</td>
                                    <td>{form?.pesel}</td>
                                    <td>{form?.motivation}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdoptionFormsTab;

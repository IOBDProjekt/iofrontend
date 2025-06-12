import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api";

export default function AdoptionFormsTab() {
  const [forms, setForms] = useState([]);

  const fetchForms = useCallback(async () => {
    try {
      const res = await api.get("/adoption");
      setForms(res.data.forms);
    } catch (err) {
      console.error("Nie udało się pobrać wniosków:", err);
    }
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleAccept = async (id) => {
    try {
      await api.post(`/adoption/${id}/accept`);

      setForms((prev) => prev.filter((f) => f.id_aform !== id));
    } catch (err) {
      console.error("Błąd przy akceptacji wniosku:", err);
      alert("Nie udało się zaakceptować wniosku");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/adoption/${id}/reject`);

      setForms((prev) => prev.filter((f) => f.id_aform !== id));
    } catch (err) {
      console.error("Błąd przy odrzuceniu wniosku:", err);
      alert("Nie udało się odrzucić wniosku");
    }
  };

  return (
    <div className="shelter-tab-content">
      <h3>Lista wniosków o adopcję</h3>
      <div className="table-container">
        <table className="shelter-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Wnioskujący</th>
              <th>ID Zwierzęcia</th>
              <th>PESEL</th>
              <th>Motywacja</th>
              <th>Akceptuj</th>
              <th>Odrzuć</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id_aform}>
                <td>{form.id_aform}</td>
                <td>
                  {form.adopter.firstname} {form.adopter.lastname} &lt;
                  {form.adopter.email}&gt;
                </td>
                <td>{form.id_pet}</td>
                <td>{form.pesel}</td>
                <td>{form.motivation}</td>
                <td>
                  <p
                    className="change-shelter-account assign-shelter-account"
                    onClick={() => handleAccept(form.id_aform)}
                  >
                    Akceptuj
                  </p>
                </td>
                <td>
                  <p
                    className="change-shelter-account remove-shelter-account"
                    onClick={() => handleReject(form.id_aform)}
                  >
                    Odrzuć
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./RegisterShelter.css";
import api from "../../api";

function RegisterShelter() {
  const [shelterData, setShelterData] = useState({
    name: "",
    city: "",
    number: "",
    email: "",
  });

  const [moderatorData, setModeratorData] = useState({
    firstname: "",
    lastname: "",
    city: "",
    email: "",
    password: "",
  });

  const handleShelterChange = (e) => {
    setShelterData({ ...shelterData, [e.target.name]: e.target.value });
  };

  const handleModeratorChange = (e) => {
    setModeratorData({ ...moderatorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      shelter_name: shelterData.name,
      shelter_city: shelterData.city,
      shelter_email: shelterData.email,
      shelter_number: shelterData.number,
      moderator_firstname: moderatorData.firstname,
      moderator_lastname: moderatorData.lastname,
      moderator_city: moderatorData.city,
      moderator_email: moderatorData.email,
      moderator_password: moderatorData.password,
    };

    await api.post("/application", payload);
    alert("Wniosek został wysłany do zatwierdzenia przez administratora.");
  } catch (err) {
    console.error(err);
    alert("Błąd przy wysyłaniu wniosku.");
  }
};

  return (
    <div className="register-shelter-container">
      <h2>Wniosek o rejestrację schroniska</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-panels">
        <div className="panel left-panel">
          <h3>Dane schroniska</h3>
          <label>
            Nazwa:
            <input
              type="text"
              name="name"
              value={shelterData.name}
              onChange={handleShelterChange}
              required
            />
          </label>
          <label>
            Miasto:
            <input
              type="text"
              name="city"
              value={shelterData.city}
              onChange={handleShelterChange}
              required
            />
          </label>
          <label>
            Numer telefonu:
            <input
              type="text"
              name="number"
              value={shelterData.number}
              onChange={handleShelterChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={shelterData.email}
              onChange={handleShelterChange}
            />
          </label>
        </div>

        <div className="panel right-panel">
          <h3>Dane moderatora</h3>
          <label>
            Imię:
            <input
              type="text"
              name="firstname"
              value={moderatorData.firstname}
              onChange={handleModeratorChange}
              required
            />
          </label>
          <label>
            Nazwisko:
            <input
              type="text"
              name="lastname"
              value={moderatorData.lastname}
              onChange={handleModeratorChange}
              required
            />
          </label>
          <label>
            Miasto:
            <input
              type="text"
              name="city"
              value={moderatorData.city}
              onChange={handleModeratorChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={moderatorData.email}
              onChange={handleModeratorChange}
              required
            />
          </label>
          <label>
            Hasło:
            <input
              type="password"
              name="password"
              value={moderatorData.password}
              onChange={handleModeratorChange}
              required
            />
          </label>
        </div>
      </div>
       <div className="submit-button">
        <button type="submit">Wyślij wniosek</button>
      </div>
      </form>
    </div>
  );
}

export default RegisterShelter;

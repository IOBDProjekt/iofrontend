import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";

import "./AdminModals.css";

export default function ShelterModal({ title, shelterData, onSubmit, updateShelterInfo, errors, setErrors, success, setSuccess }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setErrors((prev) => []);
        setOpen(false);
        setSuccess((prev) => []);
    };

    const refShelterName = useRef();
    const refShelterCity = useRef();
    const refShelterPhone = useRef();
    const refShelterEmail = useRef();

    const handleSubmit = () => {
        const shelterInfo = {
            name: refShelterName.current.value,
            city: refShelterCity.current.value,
            number: refShelterPhone.current.value,
            email: refShelterEmail.current.value,
        };
        const result = onSubmit(shelterInfo);
        setOpen(result);
    };

    return (
        <>
            <button onClick={handleOpen}>Dodaj nowe schronisko</button>
            <Modal open={open} onClose={handleClose}>
                <div className="admin-modal">
                    <h4>{title}</h4>
                    <div className="admin-modal-errors">{errors.length > 0 && errors.map((e, i) => <span key={i}>{e}</span>)}</div>
                    <div className="admin-modal-success">{success.length > 0 && success.map((e, i) => <span key={i}>{e}</span>)}</div>
                    <div className="admin-modal-inputs">
                        <input ref={refShelterName} placeholder="Nazwa schroniska" />
                        <input ref={refShelterCity} placeholder="Lokalizacja schroniska" />
                        <input ref={refShelterPhone} placeholder="Numer telefonu" />
                        <input ref={refShelterEmail} placeholder="Adres email schroniska" />
                    </div>
                    <button onClick={handleSubmit} className="admin-modal-submit">
                        Wyślij
                    </button>
                </div>
            </Modal>
        </>
    );
}

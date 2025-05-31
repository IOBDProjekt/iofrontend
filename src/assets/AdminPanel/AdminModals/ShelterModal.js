import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";

import "./AdminModals.css";

export default function ShelterModal({ title, buttonText, onSubmit, errors, setErrors, type, shelterInfo }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setErrors((prev) => []);
        setOpen(false);
    };

    const [shelterName, setShelterName] = useState("");
    const [shelterCity, setShelterCity] = useState("");
    const [shelterNumber, setShelterNumber] = useState("");
    const [shelterEmail, setShelterEmail] = useState("");

    const handleSubmit = async () => {
        const shelterData = {
            id_shelter: shelterInfo?.id_shelter,
            name: shelterName,
            city: shelterCity,
            number: shelterNumber,
            email: shelterEmail,
        };
        const result = await onSubmit(shelterData);
        setOpen(!result);
    };

    useEffect(() => {
        if (open && shelterInfo) {
            setShelterName(shelterInfo.name || "");
            setShelterCity(shelterInfo.city || "");
            setShelterNumber(shelterInfo.number || "");
            setShelterEmail(shelterInfo.email || "");
        }
    }, [open]);

    return (
        <>
            <button className={`${type == "edit" && "admin-modal-edit-button"}`} onClick={handleOpen}>
                {buttonText}
            </button>
            <Modal open={open} onClose={handleClose}>
                <div className={`admin-modal`}>
                    <h4>{title}</h4>
                    <div className="admin-modal-errors">{errors.length > 0 && errors.map((e, i) => <span key={i}>{e}</span>)}</div>
                    <div className="admin-modal-inputs">
                        <input value={shelterName} onChange={(e) => setShelterName(e.target.value)} placeholder="Nazwa schroniska" />
                        <input value={shelterCity} onChange={(e) => setShelterCity(e.target.value)} placeholder="Lokalizacja schroniska" />
                        <input value={shelterNumber} onChange={(e) => setShelterNumber(e.target.value)} placeholder="Numer telefonu" />
                        <input
                            value={shelterEmail}
                            onChange={(e) => setShelterEmail(e.target.value)}
                            placeholder="Adres email schroniska"
                        />
                    </div>
                    <button onClick={handleSubmit} className="admin-modal-submit">
                        Wyślij
                    </button>
                </div>
            </Modal>
        </>
    );
}

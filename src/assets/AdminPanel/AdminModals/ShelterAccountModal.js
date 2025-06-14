import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";

import "./AdminModals.css";

export default function ShelterAccountModal({ title, buttonText, onSubmit, errors, setErrors, type, accountInfo }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setErrors((prev) => []);
        setOpen(false);
    };

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const data = {
            id_user: accountInfo?.id_user,
            firstname: firstname,
            lastname: lastname,
            city: city,
            email: email,
            password: password,
        };
        const result = await onSubmit(data);
        setOpen(!result);
    };

    useEffect(() => {
        if (open && accountInfo) {
            setFirstname(accountInfo.firstname || "");
            setLastname(accountInfo.lastname || "");
            setCity(accountInfo.city || "");
            setEmail(accountInfo.email || "");
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
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Imię moderatora" />
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Nazwisko moderatora" />
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Miejscowość" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adres email moderatora" />
                        {type !== "edit" && (
                            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło dla moderatora" />
                        )}
                    </div>
                    <button onClick={handleSubmit} className="admin-modal-submit">
                        Wyślij
                    </button>
                </div>
            </Modal>
        </>
    );
}

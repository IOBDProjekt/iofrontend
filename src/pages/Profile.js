import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import UserProfile from "../assets/Profiles/UserProfile";
import ShelterProfile from "../assets/Profiles/ShelterProfile";
import AdminProfile from "../assets/Profiles/AdminProfile";
import api from "../api";

export default function Profile() {
    const { user, setUser, loginUser } = useUser();
    const [profile, setProfile] = useState(user);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("Brak tokena autoryzacyjnego. Zaloguj się, aby zobaczyć profil.");
            return;
        }

        const fetchProfileData = async () => {
            try {
                const response = await api.get("/auth/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfile(response.data);
                loginUser(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchProfileData();
    }, []);

    if (error) {
        return <div className="container">{error}</div>;
    }

    if (!profile) {
        return <div className="container">Ładowanie...</div>;
    }

    switch (profile.role) {
        case "user":
            return <UserProfile user={user} />;
        case "shelter":
            return <ShelterProfile />;
        case "admin":
            return <AdminProfile />;
    }
}

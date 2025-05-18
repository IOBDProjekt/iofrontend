import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Profile() {
    const { user, setUser } = useUser();
    const [profile, setProfile] = useState(user);
    const [error, setError] = useState('');

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError("Brak tokena autoryzacyjnego. Zaloguj się, aby zobaczyć profil.");
            return;
        }

        // Fetch the profile using the token in the Authorization header
        fetch('https://iobackend.onrender.com/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania danych profilu.");
                }
                return response.json();
            })
            .then(data => {
                setProfile(data);
                // Optionally update the user context if needed
                setUser(data);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, [setUser]);

    if (error) {
        return <div className="container">{error}</div>;
    }

    if (!profile) {
        return <div className="container">Ładowanie...</div>;
    }

    return (
        <div className="container">
            <h2>Profil</h2>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Username:</strong> {profile.username}</p>
        </div>
    );
}

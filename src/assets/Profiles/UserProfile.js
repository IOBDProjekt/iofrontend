import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { useUser } from "../../context/UserContext";
import api from "../../api";

const UserProfile = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState({});
    const [favourites, setFavouries] = useState([]);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const fetchFavourites = async () => {
        try {
            const response = await api.get("/favourite");
        } catch (error) {}
    };

    useEffect(() => {
        fetchFavourites();
    }, []);

    return (
        <div className={styles["container"]}>
            <div className={styles["user-card"]}>
                <div className={styles["avatar"]}>{userData?.firstname?.charAt(0).toUpperCase()}</div>
                <div className={styles["user-info"]}>
                    <h2 className={styles["user-name"]}>
                        {userData.firstname} {userData.lastname} &lt;
                        <a href={`mailto:${userData.email}`} className={styles["user-email"]}>
                            {userData.email}
                        </a>
                        &gt;
                    </h2>
                    <p className={styles["user-city"]}>{userData.city}</p>
                </div>
            </div>
            <div>
                <h3 className={styles["card-title"]}>Polubione ogłoszenia</h3>
                {favourites.length > 0 ? (
                    <div className={styles["favourites"]}></div>
                ) : (
                    <h4 className={styles["empty-favourites"]}>Brak polubionych ogłoszeń</h4>
                )}
            </div>
        </div>
    );
};

export default UserProfile;

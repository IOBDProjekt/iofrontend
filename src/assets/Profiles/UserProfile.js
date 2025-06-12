import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { useUser } from "../../context/UserContext";
import api from "../../api";

import ChatSidebar from "../Chat/ChatSidebar";
import ChatWindow from "../Chat/ChatWindow";

import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState({});
    const [favourites, setFavourites] = useState([]);

    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const userId = Number(user?.id_user);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const petId = params.get("petId");
        const withUser = params.get("with");

        if (petId && withUser && conversations.length > 0) {
            const conv = conversations.find(
                (c) => c.id_pet.toString() === petId && c.conversation_with.toString() === withUser
            );
            if (conv) {
                setActiveConversation(conv);
            }
        }
    }, [location.search, conversations]);

    useEffect(() => {
        if (!userId) return;
        const fetchConversations = async () => {
            try {
                const res = await api.get("/message/me");
                const data = res.data.messages;

                const formatted = data.map((conv) => {
                    const isSender = Number(conv.id_sender) === userId;

                    return {
                        id_pet: conv.id_pet,
                        petName: conv.petName,
                        conversation_with: isSender ? conv.id_receiver : conv.id_sender,
                        conversation_with_name: isSender ? conv.receiverName : conv.senderName,
                        lastMessageSentAt: conv.lastMessageSentAt,
                    };
                });

                setConversations(formatted);
            } catch (err) {
                console.error("Error downloading conversations: ", err);
            }
        };

        if (userId) {
            fetchConversations();
        }
        console.log(userId);
    }, [user]);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await api.get("/favourite");
                setFavourites(response.data.favourites);
            } catch (error) {}
        };

        fetchFavourites();
    }, []);

    return (
        <div className={styles["container"]}>
            <div className={styles["user-card"]}>
                <div className={styles["avatar"]}>{userData?.firstname?.charAt(0).toUpperCase()}</div>
                <div className={styles["user-info"]}>
                    <h2 className={styles["user-name"]}>
                        {userData?.firstname} {userData?.lastname} &lt;
                        <a href={`mailto:${userData?.email}`} className={styles["user-email"]}>
                            {userData?.email}
                        </a>
                        &gt;
                    </h2>
                    <p className={styles["user-city"]}>{userData?.city}</p>
                </div>
            </div>
            <div>
                <h3 className={styles["card-title"]}>Polubione ogłoszenia</h3>
                {favourites.length > 0 ? (
                    <div className={styles["favourites"]}>
                        {favourites.map((fav) => {
                            {
                                console.log(fav);
                            }

                            return (
                                <div key={fav.id_pet} className={styles["fav-item"]}>
                                    <span>{fav?.name}</span>
                                    <a href={`/pet/${fav?.id_pet}`}>Zobacz ogłoszenie</a>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <h4 className={styles["empty-favourites"]}>Brak polubionych ogłoszeń</h4>
                )}
            </div>
            <div>
                <h3 className={styles["card-title"]}>Aktywne czaty</h3>
                <div style={{ display: "flex", height: "100%" }}>
                    <ChatSidebar
                        conversations={conversations}
                        setActiveConversation={setActiveConversation}
                        activeConversation={activeConversation}
                    />
                    <div style={{ flex: 1 }}>
                        {activeConversation ? (
                            <ChatWindow conversation={activeConversation} currentUser={userId} />
                        ) : (
                            <p style={{ padding: 20 }}> Wybierz rozmowę z listy</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

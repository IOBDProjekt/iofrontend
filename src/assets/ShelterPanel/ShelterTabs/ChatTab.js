import { useEffect, useState } from "react";
import ChatSideBar from "./../../Chat/ChatSidebar";
import ChatWindow from "./../../Chat/ChatWindow";
import api from "../../../api";
import { useUser } from "../../../context/UserContext";

const ChatTab = () => {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const { user } = useUser();
    const userId = Number(user?.id_user);

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

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ChatSideBar
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
    );
};

export default ChatTab;

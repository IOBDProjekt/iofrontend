import { useEffect, useState, useRef } from "react";
import api from "../../api";

import "./Chat.css";

const ChatWindow = ({ conversation, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            const { conversation_with, id_pet } = conversation;

            const user1 = Number(currentUser);
            const user2 = Number(conversation_with);
            const petId = Number(id_pet);

            console.log({ user1, user2, petId });

            try {
                const res = await api.get("/message/thread", {
                    params: {
                        id_sender: user1,
                        id_receiver: user2,
                        pet_id: petId,
                    },
                });
                setMessages(res.data.messages);
            } catch (err) {
                console.error("Error downloading messages: ", err);
            }
        };

        fetchMessages();
    }, [conversation]);

    const socketRef = useRef(null);
    useEffect(() => {
        if (!currentUser) return;

        const httpBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const wsBaseUrl = httpBaseUrl.replace(/^http/, "ws");

        socketRef.current = new WebSocket(wsBaseUrl);
        socketRef.current.onopen = () => {
            console.log("Websocket connected. UserId: ", currentUser);
            socketRef.current.send(
                JSON.stringify({
                    type: "init",
                    userId: currentUser,
                })
            );
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "new_message") {
                if (
                    Number(data.fromUserId) === Number(conversation.conversation_with) &&
                    Number(data.id_pet) === Number(conversation.id_pet)
                ) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id_sender: data.fromUserId,
                            content: data.content,
                        },
                    ]);
                }
            }
        };

        socketRef.current.onerror = (err) => {
            console.error("Websocket error: ", err);
        };

        socketRef.current.onclose = () => {
            console.log("Websocket disconnected");
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [conversation, currentUser]);

    const handleSendMessage = async () => {
        const { conversation_with, id_pet } = conversation;
        if (!text.trim()) return;

        await api.post("/message", {
            id_receiver: Number(conversation_with),
            content: text,
            id_pet: Number(id_pet),
        });

        setMessages((prev) => [...prev, { id_sender: currentUser, receiver_id: conversation_with, content: text }]);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(
                JSON.stringify({
                    type: "message",
                    userId: currentUser,
                    toUserId: conversation_with,
                    id_pet,
                    content: text,
                })
            );
        }

        setText("");
    };

    return (
        <div style={{ padding: 20 }}>
            <h3 style={{ marginBottom: 10 }}>
                Rozmowa o: <b>{conversation.petName}</b> z {conversation.conversation_with_name}
            </h3>

            <div
            ref={messagesContainerRef}
                style={{
                    height: 300,
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                    padding: 8,
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.id_sender === currentUser ? "right" : "left",
                            margin: "4px 0",
                        }}
                    >
                        <span
                            style={{
                                background: msg.id_sender === currentUser ? "#dcf8c6" : "#eee",
                                padding: "6px 10px",
                                borderRadius: "12px",
                                display: "inline-block",
                                maxWidth: "70%",
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    value={text}
                    className="message-input"
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Wpisz wiadomość..."
                />
                <button className="send-button" onClick={handleSendMessage}>
                    Wyślij
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;

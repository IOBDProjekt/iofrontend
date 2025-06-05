const ChatSidebar = ({ conversations, setActiveConversation, activeConversation }) => {
    return (
        <div style={{ width: 250, borderRight: "1px solid #ccc", overflowY: "auto" }}>
            <h4 className="chat-box-title" style={{ padding: 10 }}>
                Rozmowy
            </h4>
            {conversations.map((conv, index) => {
                const isActive =
                    activeConversation?.id_pet === conv.id_pet &&
                    activeConversation?.conversation_with === conv.conversation_with;

                return (
                    <div
                        key={index}
                        style={{
                            padding: 10,
                            cursor: "pointer",
                            backgroundColor: isActive ? "#f0f0f0" : "white",
                        }}
                        onClick={() => setActiveConversation(conv)}
                    >
                        <strong>Zwierz:</strong> {conv.petName} <br />
                        <strong>Rozmowa z:</strong>{" "}
                        {conv.conversation_with_name || `Użytkownik ${conv.conversation_with}`}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatSidebar;

import ChatCard from "./ChatCard";
const ChatList = ({
    chats,
    selectedChat,
    setSelectedChat,
}) => {
    return (
        <div className="space-y-2">
            {chats.map((chat) => (
                <ChatCard
                    key={chat.id}
                    chat={chat}
                    selected={selectedChat?.id === chat.id}
                    onClick={() => setSelectedChat(chat)}
                />
            ))}
        </div>
    );
};

export default ChatList;
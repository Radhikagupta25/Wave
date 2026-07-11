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
                    key={chat._id}
                    chat={chat}
                    selected={selectedChat?._id === chat._id}
                    onClick={() => setSelectedChat(chat)}
                />
            ))}
        </div>
    );
};

export default ChatList;
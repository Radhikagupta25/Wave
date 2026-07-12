import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ChatHeader from "../Chat/ChatHeader";
import MessageList from "../Chat/MessageList";
import MessageInput from "../Chat/MessageInput";
import MobileHeader from "../Mobile/MobileHeader";
import MobileMenu from "../Mobile/MobileMenu";
import { getMessages } from "../../../api/messageApi";
import { getConversations } from "../../../api/conversationApi";
import { useLocation } from "react-router-dom";
import { socket } from "../../../services/socket";
import { markMessagesAsSeen } from "../../../api/messageApi";

const ChatLayout = () => {

    const loggedInUserId = localStorage.getItem("userId");
    const [unreadCounts, setUnreadCounts] = useState({});
    const [selectedChat, setSelectedChat] = useState(null);
    const [mobileChatOpen, setMobileChatOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [typingUserId, setTypingUserId] = useState(null);
    const [onlineUserIds, setOnlineUserIds] = useState(new Set());
    const location = useLocation();

    const fetchConversations = async () => {
        try {
            const data = await getConversations();
            setConversations(data);
            setUnreadCounts(prev => {
                const next = { ...prev };
                data.forEach(conv => {
                    if (!(conv._id in next)) {
                        next[conv._id] = conv.unreadCount || 0;
                    }
                });
                return next;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessages = async () => {
        try {
            const data = await getMessages(selectedChat._id);
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!loggedInUserId) return;

        if (!socket.connected) {
            socket.connect();
        }

        const handleConnect = () => {
            socket.emit("setup", loggedInUserId);
        };

        socket.on("connect", handleConnect);
        if (socket.connected) handleConnect();

        return () => {
            socket.off("connect", handleConnect);
        };
    }, []);

    useEffect(() => {

        const handleOnlineUsers = ({ userIds }) => {
            setOnlineUserIds(new Set(userIds));
        };

        const handleUserOnline = ({ userId }) => {
            setOnlineUserIds(prev => new Set(prev).add(userId));
        };

        const handleUserOffline = ({ userId }) => {
            setOnlineUserIds(prev => {
                const next = new Set(prev);
                next.delete(userId);
                return next;
            });
        };

        socket.on("online-users", handleOnlineUsers);
        socket.on("user-online", handleUserOnline);
        socket.on("user-offline", handleUserOffline);

        return () => {
            socket.off("online-users", handleOnlineUsers);
            socket.off("user-online", handleUserOnline);
            socket.off("user-offline", handleUserOffline);
        };

    }, []);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!location.state?.conversation) return;
        setSelectedChat(location.state.conversation);
    }, [location.state]);

    useEffect(() => {
        if (!selectedChat) return;

        socket.emit("join-conversation", selectedChat._id);
        setTypingUserId(null);

        const loadChat = async () => {
            await fetchMessages();
            await markMessagesAsSeen(selectedChat._id);
            setUnreadCounts(prev => ({ ...prev, [selectedChat._id]: 0 }));
        };

        loadChat();

        return () => {
            socket.emit("leave-conversation", selectedChat._id);
        };
    }, [selectedChat]);
    useEffect(() => {

        const handleSeen = ({ conversationId, userId, messageIds }) => {

            if (conversationId !== selectedChat?._id) return;
            if (userId === loggedInUserId) return;

            setMessages(prev =>
                prev.map(message => {
                    if (!messageIds?.includes(message._id)) return message;

                    const alreadySeen = (message.seenBy || []).some(
                        id => id.toString() === userId.toString()
                    );
                    if (alreadySeen) return message;

                    return {
                        ...message,
                        seenBy: [...(message.seenBy || []), userId],
                    };
                })
            );
        };

        socket.on("messages-seen", handleSeen);

        return () => {
            socket.off("messages-seen", handleSeen);
        };

    }, [selectedChat]);
    useEffect(() => {
        const handleNewMessage = ({ conversationId, message }) => {
            setConversations(prev =>
                prev.map(conv =>
                    conv._id === conversationId
                        ? { ...conv, lastMessage: message, lastMessageAt: message.createdAt }
                        : conv
                )
            );

            const isOpenChat = conversationId === selectedChat?._id;

            if (isOpenChat) {
                setMessages(prev => {
                    if (prev.some(m => m._id === message._id)) return prev;
                    return [...prev, message];
                });

                if (message.sender._id !== loggedInUserId) {
                    markMessagesAsSeen(conversationId).catch(err => console.log(err));
                }
            } else if (message.sender._id !== loggedInUserId) {
                setUnreadCounts(prev => ({
                    ...prev,
                    [conversationId]: (prev[conversationId] || 0) + 1,
                }));
            }
        };
        socket.on("new-message", handleNewMessage);

        return () => {
            socket.off("new-message", handleNewMessage);
        };

    }, [selectedChat]);

    useEffect(() => {
        if (!selectedChat) return;

        const handleTyping = ({ conversationId, userId }) => {
            if (conversationId !== selectedChat._id) return;
            if (userId === loggedInUserId) return;
            setTypingUserId(userId);
        };

        const handleStopTyping = ({ conversationId, userId }) => {
            if (conversationId !== selectedChat._id) return;
            setTypingUserId(prev => (prev === userId ? null : prev));
        };

        socket.on("typing", handleTyping);
        socket.on("stop-typing", handleStopTyping);

        return () => {
            socket.off("typing", handleTyping);
            socket.off("stop-typing", handleStopTyping);
        };

    }, [selectedChat]);

    const conversationsWithPresence = conversations.map(conv => {
        const otherUser = conv.participants?.find(u => u._id !== loggedInUserId);
        return {
            ...conv,
            online: otherUser ? onlineUserIds.has(otherUser._id) : false,
            unreadCount: unreadCounts[conv._id] || 0,
        };
    });
    
    const selectedChatWithPresence = selectedChat
        ? {
            ...selectedChat,
            online: (() => {
                const otherUser = selectedChat.participants?.find(u => u._id !== loggedInUserId);
                return otherUser ? onlineUserIds.has(otherUser._id) : false;
            })(),
        }
        : null;

    return (

        <div className="h-screen bg-[#08131F] text-white">
            <div className="hidden h-full lg:flex">
                <div className="w-90 border-r border-white/10">
                    <Sidebar
                        chats={conversationsWithPresence}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                    />
                </div>

                <div className="flex flex-1 flex-col">
                    {selectedChat ? (
                        <>
                            <ChatHeader
                                chat={selectedChatWithPresence}
                                isTyping={!!typingUserId}
                            />
                            <MessageList
                                messages={messages}
                                selectedChat={selectedChat}
                                isTyping={!!typingUserId}
                            />
                            <MessageInput
                                chat={selectedChat}
                                fetchConversations={fetchConversations}
                                setMessages={setMessages}
                            />
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold">Wave</h1>
                                <p className="mt-4 text-slate-400">
                                    Select a conversation to start messaging.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex h-full flex-col lg:hidden">
                {mobileChatOpen ? (
                    <>
                        <ChatHeader
                            mobile
                            chat={selectedChatWithPresence}
                            isTyping={!!typingUserId}
                            onBack={() => setMobileChatOpen(false)}
                        />
                        <MessageList
                            messages={messages}
                            selectedChat={selectedChat}
                            isTyping={!!typingUserId}
                        />
                        <MessageInput
                            chat={selectedChat}
                            fetchConversations={fetchConversations}
                            setMessages={setMessages}
                        />
                    </>
                ) : (
                    <>
                        <MobileHeader onMenuOpen={() => setMenuOpen(true)} />
                        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
                        <Sidebar
                            mobile
                            chats={conversationsWithPresence}
                            selectedChat={selectedChat}
                            setSelectedChat={(chat) => {
                                setSelectedChat(chat);
                                setMobileChatOpen(true);
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatLayout;
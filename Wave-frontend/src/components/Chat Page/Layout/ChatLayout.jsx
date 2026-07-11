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

const ChatLayout = () => {

    const [selectedChat, setSelectedChat] = useState(null);
    const [mobileChatOpen, setMobileChatOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const fetchConversations = async () => {
        try {
            const data = await getConversations();
            setConversations(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
        finally {
            console.timeEnd("Fetch Conversations");
        }
    };
    const fetchMessages = async () => {
        try {
            const data = await getMessages(selectedChat._id);
            setMessages(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchConversations();
    }, []);
    useEffect(() => {

        if (!location.state?.conversation) return;

        setSelectedChat(location.state.conversation);

    }, [location.state]);
    useEffect(() => {
        if (selectedChat) {
            fetchMessages();
        }
    }, [selectedChat]);
    useEffect(() => {
        if (!selectedChat) return;
        socket.emit(
            "join-conversation",
            selectedChat._id
        );
        return () => {
            socket.emit(
                "leave-conversation",
                selectedChat._id
            );

        };

    }, [selectedChat]);
    useEffect(() => {

        if (!selectedChat) return;

        const handleNewMessage = ({ conversationId, message }) => {

            if (conversationId !== selectedChat._id) return;

            setMessages(prev => {

                if (prev.some(m => m._id === message._id)) {
                    return prev;
                }

                return [...prev, message];

            });

        };

        socket.on("new-message", handleNewMessage);

        return () => {
            socket.off("new-message", handleNewMessage);
        };

    }, [selectedChat]);
    return (

        <div className="h-screen bg-[#08131F] text-white">
            <div className="hidden h-full lg:flex">

                <div className="w-90 border-r border-white/10">

                    <Sidebar
                        chats={conversations}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                    />

                </div>

                <div className="flex flex-1 flex-col">

                    {

                        selectedChat ?

                            <>

                                <ChatHeader
                                    chat={selectedChat}
                                />

                                <MessageList
                                    messages={messages}
                                />

                                <MessageInput
                                    chat={selectedChat}
                                    fetchConversations={fetchConversations}
                                    setMessages={setMessages}
                                />

                            </>

                            :

                            <div className="flex flex-1 items-center justify-center">

                                <div className="text-center">

                                    <h1 className="text-4xl font-bold">

                                        Wave

                                    </h1>

                                    <p className="mt-4 text-slate-400">

                                        Select a conversation to start messaging.

                                    </p>

                                </div>

                            </div>

                    }

                </div>

            </div>

            <div className="flex h-full flex-col lg:hidden">

                {

                    mobileChatOpen ?

                        <>

                            <ChatHeader
                                mobile
                                chat={selectedChat}
                                onBack={() =>
                                    setMobileChatOpen(false)
                                }
                            />

                            <MessageList
                                messages={messages}
                            />

                            <MessageInput
                                chat={selectedChat}
                                fetchConversations={fetchConversations}
                                setMessages={setMessages}
                            />

                        </>

                        :

                        <>

                            <MobileHeader
                                onMenuOpen={() => setMenuOpen(true)}
                            />

                            <MobileMenu
                                open={menuOpen}
                                onClose={() => setMenuOpen(false)}
                            />

                            <Sidebar
                                mobile
                                chats={conversations}
                                selectedChat={selectedChat}
                                setSelectedChat={(chat) => {

                                    setSelectedChat(chat);

                                    setMobileChatOpen(true);

                                }}
                            />

                        </>

                }

            </div>

        </div>

    );

};

export default ChatLayout;
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ChatHeader from "../Chat/ChatHeader";
import MessageList from "../Chat/MessageList";
import MessageInput from "../Chat/MessageInput";
import MobileHeader from "../Mobile/MobileHeader";
import dummyData from "../data/dummyData";

const ChatLayout = () => {

    const [selectedChat, setSelectedChat] = useState(null);

    const [mobileChatOpen, setMobileChatOpen] = useState(false);

    return (

        <div className="h-screen bg-[#08131F] text-white">

            {/* ---------------- DESKTOP ---------------- */}

            <div className="hidden h-full lg:flex">

                <div className="w-90 border-r border-white/10">

                    <Sidebar
                        chats={dummyData}
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
                                    chat={selectedChat}
                                />

                                <MessageInput
                                    chat={selectedChat}
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

            {/* ---------------- MOBILE ---------------- */}

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
                                chat={selectedChat}
                            />

                            <MessageInput
                                chat={selectedChat}
                            />

                        </>

                        :

                        <>

                            <MobileHeader />

                            <Sidebar
                                mobile
                                chats={dummyData}
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
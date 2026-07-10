import { MessageCircleMore } from "lucide-react";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";

const Sidebar = ({
    chats,
    selectedChat,
    setSelectedChat,
    mobile = false,
}) => {
    return (
        <aside className="flex h-full flex-col bg-[#0B1523]">
            <div className="border-b border-white/10 px-6 py-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(34,211,238,.35)]">

                        <MessageCircleMore size={24} />

                    </div>

                    <div>

                        <h1 className="text-xl font-bold text-white">

                            Wave

                        </h1>

                        <p className="text-sm text-slate-400">

                            Ride the conversation

                        </p>

                    </div>

                </div>

            </div>
            <div className="px-5 py-4">

                <SearchBar />

            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-3">

                <ChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />

            </div>
        </aside>
    );
};

export default Sidebar;
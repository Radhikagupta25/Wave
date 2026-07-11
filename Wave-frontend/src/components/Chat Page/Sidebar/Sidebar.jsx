import { Waves, MoreVertical, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";
import { useState } from "react";
import MobileMenu from "../Mobile/MobileMenu";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
    chats,
    selectedChat,
    setSelectedChat,
    mobile = false,
}) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const loggedInUserId = localStorage.getItem("userId");
    const filteredChats = chats.filter((chat) => {
        const otherUser = chat.participants?.find(
            (user) => user._id !== loggedInUserId
        );
        const search = searchTerm.toLowerCase();
        return (
            otherUser?.username
                ?.toLowerCase()
                .includes(search) ||

            otherUser?.fullname
                ?.toLowerCase()
                .includes(search)
        );

    });
    return (
        <aside className="flex h-full flex-col bg-[#0B1523]">
            {!mobile && (
                <div className="border-b border-white/10 px-6 py-5">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(34,211,238,.35)]">

                                <Waves
                                    className="text-white"
                                    size={20}
                                />

                            </div>

                            <div>

                                <h1 className="text-xl font-bold text-white">

                                    Wave

                                </h1>

                                <p className="text-sm text-slate-400">

                                    Where conversations flow

                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() => setMenuOpen(true)}
                            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
                        >

                            <MoreVertical size={22} />

                        </button>

                    </div>
                </div>
            )}
            <MobileMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
            <div className="flex items-center gap-3 px-5 py-4">

                <div className="flex-1">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

                <button
                    onClick={() => navigate("/new-chat")}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl
        border border-white/10 bg-white/5
        text-cyan-300 transition
        hover:border-cyan-400
        hover:bg-cyan-500/10
        hover:shadow-[0_0_25px_rgba(34,211,238,.35)]"
                >
                    <Plus size={24} />
                </button>

            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-3">
                <ChatList
                    chats={filteredChats}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />
            </div>

        </aside>
    );
};

export default Sidebar;
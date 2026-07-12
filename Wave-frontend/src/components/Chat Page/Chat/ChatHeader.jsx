import {
    ArrowLeft,
    Phone,
    Video,
    Search,
    MoreVertical,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ChatMenu from "./ChatMenu";
import { startGroupCall, startVideoCall, startVoiceCall } from "../../../services/zegoCall";

const ChatHeader = ({
    chat,
    mobile = false,
    onBack,
    isTyping = false,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const loggedInUserId = localStorage.getItem("userId");

    const otherUser = chat?.participants?.find(
        user => user._id !== loggedInUserId
    );

    const displayName = chat.isGroup
        ? chat.groupName
        : (otherUser?.username
            ? otherUser.username.charAt(0).toUpperCase() + otherUser.username.slice(1)
            : "Unknown User");

    const displayAvatar = chat.isGroup ? chat.groupAvatar : otherUser?.avatar;

    const statusText = chat.isGroup
        ? `${chat.participants?.length || 0} members`
        : (isTyping ? "typing..." : (chat.online ? "Online" : "Offline"));

    return (
        <div
            className={`relative z-50 flex items-center justify-between border-b border-white/10 bg-[#08131F]/90 backdrop-blur-xl ${mobile ? "h-16 px-4" : "h-20 px-8"
                }`}
        >
            <div className="flex items-center gap-3 min-w-0">

                {mobile && (
                    <button
                        onClick={onBack}
                        className="rounded-xl p-2 hover:bg-white/5"
                    >
                        <ArrowLeft size={22} />
                    </button>
                )}

                <div className="relative">

                    <div
                        className={`flex items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-white font-semibold ${mobile ? "h-10 w-10" : "h-14 w-14"
                            }`}
                    >
                        {displayAvatar ? (
                            <img
                                src={displayAvatar}
                                alt={displayName}
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : chat.isGroup ? (
                            <Users size={mobile ? 18 : 22} />
                        ) : (
                            displayName?.charAt(0).toUpperCase() || "?"
                        )}
                    </div>

                    {!chat.isGroup && chat.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#08131F] bg-green-400" />
                    )}

                </div>

                <div className="min-w-0">

                    <h2 className="truncate font-semibold text-white">
                        {displayName}
                    </h2>

                    <p className={`truncate text-xs ${chat.isGroup
                        ? "text-slate-400"
                        : isTyping
                            ? "text-cyan-300"
                            : chat.online
                                ? "text-green-400"
                                : "text-slate-400"
                        }`}>
                        {statusText}
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        if (chat.isGroup) {
                            const others = chat.participants.filter(p => p._id !== loggedInUserId);
                            startGroupCall(others, false, chat._id);
                        } else {
                            startVoiceCall(otherUser._id, otherUser.username, chat._id);
                        }
                    }}
                    className={`${mobile
                        ? "rounded-xl p-2"
                        : "rounded-2xl border border-white/10 bg-white/5 p-3"
                        } text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300`}
                >
                    <Phone size={20} />
                </button>

                <button
                    onClick={() => {
                        if (chat.isGroup) {
                            const others = chat.participants.filter(p => p._id !== loggedInUserId);
                            startGroupCall(others, true, chat._id);
                        } else {
                            startVideoCall(otherUser._id, otherUser.username, chat._id);
                        }
                    }}
                    className={`${mobile
                        ? "rounded-xl p-2"
                        : "rounded-2xl border border-white/10 bg-white/5 p-3"
                        } text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300`}
                >
                    <Video size={20} />
                </button>

                <div className="relative">

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`${mobile
                            ? "rounded-xl p-2"
                            : "rounded-2xl border border-white/10 bg-white/5 p-3"
                            } text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300`}
                    >
                        <MoreVertical size={20} />
                    </button>

                    <ChatMenu
                        open={menuOpen}
                        onClose={() => setMenuOpen(false)}
                        isGroup={chat?.isGroup}
                        chat={chat}
                    />

                </div>

            </div>
        </div>
    );
};

export default ChatHeader;
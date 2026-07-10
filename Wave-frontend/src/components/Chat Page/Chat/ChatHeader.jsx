import {
    ArrowLeft,
    Phone,
    Video,
    Search,
    MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ChatMenu from "./ChatMenu";

const ChatHeader = ({
    chat,
    mobile = false,
    onBack,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div
            className={`flex items-center justify-between border-b border-white/10 bg-[#08131F]/90 backdrop-blur-xl ${mobile ? "h-16 px-4" : "h-20 px-8"
                }`}
        >
            {/* LEFT */}
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
                        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold ${mobile ? "h-10 w-10" : "h-14 w-14"
                            }`}
                    >
                        {chat.name[0]}
                    </div>

                    {chat.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#08131F] bg-green-400" />
                    )}

                </div>

                <div className="min-w-0">

                    <h2 className="truncate font-semibold text-white">
                        {chat.name}
                    </h2>

                    <p className="text-xs text-green-400">
                        {chat.online ? "Online" : "Offline"}
                    </p>

                </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">

                <button
                    className={`${mobile
                            ? "rounded-xl p-2"
                            : "rounded-2xl border border-white/10 bg-white/5 p-3"
                        } text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300`}
                >
                    <Phone size={20} />
                </button>

                <button
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
                    />

                </div>

            </div>
        </div>
    );
};

export default ChatHeader;
import {
    User,
    Ban,
    Info,
    Users,
    LogOut,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

const ChatMenu = ({ open, onClose, isGroup = false }) => {

    if (!open) return null;

    const dmMenuItems = [
        {
            icon: User,
            label: "View Profile",
        },
        {
            divider: true,
        },
        {
            icon: Ban,
            label: "Block User",
            danger: true,
        },
    ];

    const groupMenuItems = [
        {
            icon: Info,
            label: "Group Info",
        },
        {
            icon: Users,
            label: "View Members",
        },
        {
            divider: true,
        },
        {
            icon: LogOut,
            label: "Leave Group",
            danger: true,
        },
    ];

    const menuItems = isGroup ? groupMenuItems : dmMenuItems;

    return (
        <AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: .95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: .95, y: -10 }}
                transition={{ duration: .15 }}
                className="absolute right-0 top-full mt-2 z-9999 w-60 rounded-2xl border border-white/10 bg-[#0F1B2B] p-2 shadow-[0_15px_40px_rgba(0,0,0,.45)] backdrop-blur-xl"
            >
                {menuItems.map((item, index) => {

                    if (item.divider) {
                        return (
                            <div
                                key={index}
                                className="my-2 border-t border-white/10"
                            />
                        );
                    }

                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            onClick={onClose}
                            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition
                            ${item.danger
                                    ? "text-red-400 hover:bg-red-500/10"
                                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </button>
                    );
                })}
            </motion.div>

        </AnimatePresence>
    );
};

export default ChatMenu;
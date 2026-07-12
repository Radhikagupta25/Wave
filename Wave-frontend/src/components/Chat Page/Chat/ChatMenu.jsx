import {
    User,
    Ban,
    Info,
    Users,
    LogOut,
} from "lucide-react";
import { blockUser, unblockUser } from "../../../api/authApi";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const ChatMenu = ({
    open,
    onClose,
    isGroup = false,
    chat,
    fetchConversations, // Added as prop
    setSelectedChat     // Added as prop
}) => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const me = chat?.participants?.find(
        participant => participant._id === loggedInUser?._id
    );

    const otherParticipant = chat?.participants?.find(
        participant => participant._id !== loggedInUser?._id
    );

    // Keep state in sync if the chat prop changes from the parent
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        if (me && otherParticipant) {
            setIsBlocked(me.blockedUsers?.includes(otherParticipant._id) || false);
        }
    }, [chat, me, otherParticipant]);

    if (!open || !chat || !me || (!isGroup && !otherParticipant)) return null;

    const handleBlockToggle = async () => {
        try {
            if (isBlocked) {
                await unblockUser(otherParticipant._id);
                setIsBlocked(false);
                toast.success("User unblocked");
            } else {
                await blockUser(otherParticipant._id);
                setIsBlocked(true);
                toast.success("User blocked");
            }

            // Safely trigger parent refreshes if they were passed down
            if (fetchConversations) await fetchConversations();

            // Optional: If your backend returns the newly updated chat object, 
            // you can pass it to setSelectedChat here. Otherwise, fetchConversations handles it.

            // Commenting out onClose() so the user can see the button text switch immediately.
            // Remove the comment below if you prefer it to close right away.
            // onClose(); 

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
        }
    };

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
            label: isBlocked ? "Unblock User" : "Block User",
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
                                key={`divider-${index}`}
                                className="my-2 border-t border-white/10"
                            />
                        );
                    }

                    const Icon = item.icon;

                    return (
                        <button
                            key={item.label}
                            onClick={() => {
                                if (item.icon === Ban) {
                                    handleBlockToggle();
                                } else {
                                    onClose();
                                }
                            }}
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
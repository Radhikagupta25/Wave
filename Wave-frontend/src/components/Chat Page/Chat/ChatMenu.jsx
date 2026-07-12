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
import { useNavigate } from "react-router-dom";
import GroupInfoPanel from "./GroupInfoPanel";

const ChatMenu = ({
    open,
    onClose,
    isGroup = false,
    chat,
    fetchConversations,
    setSelectedChat
}) => {

    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const me = chat?.participants?.find(
        participant => participant._id === loggedInUser?._id
    );

    const otherParticipant = chat?.participants?.find(
        participant => participant._id !== loggedInUser?._id
    );

    const [isBlocked, setIsBlocked] = useState(false);
    const [showGroupInfo, setShowGroupInfo] = useState(false);

    useEffect(() => {
        if (me && otherParticipant) {
            setIsBlocked(me.blockedUsers?.includes(otherParticipant._id) || false);
        }
    }, [chat, me, otherParticipant]);

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

            if (fetchConversations) await fetchConversations();

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
        }
    };

    const dmMenuItems = [
        { icon: User, label: "View Profile" },
        { divider: true },
        { icon: Ban, label: isBlocked ? "Unblock User" : "Block User", danger: true },
    ];

    const groupMenuItems = [
        { icon: Info, label: "Group Info" },
        { divider: true },
        { icon: LogOut, label: "Leave Group", danger: true },
    ];

    const menuItems = isGroup ? groupMenuItems : dmMenuItems;
    const showDropdown = open && chat && me && (isGroup || otherParticipant);

    return (
        <>
            {showDropdown && (
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
                                return <div key={`divider-${index}`} className="my-2 border-t border-white/10" />;
                            }

                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        if (item.icon === Ban) {
                                            handleBlockToggle();
                                        } else if (item.icon === User) {
                                            navigate(`/profile/${otherParticipant._id}`);
                                            onClose();
                                        } else if (
                                            item.icon === Info ||
                                            item.icon === Users ||
                                            item.icon === LogOut
                                        ) {
                                            setShowGroupInfo(true);
                                            onClose();
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
            )}

            {isGroup && chat && (
                <GroupInfoPanel
                    open={showGroupInfo}
                    onClose={() => setShowGroupInfo(false)}
                    conversationId={chat._id}
                    onLeft={() => {
                        if (fetchConversations) fetchConversations();
                        if (setSelectedChat) setSelectedChat(null);
                    }}
                />
            )}
        </>
    );
};

export default ChatMenu;
import { motion } from "framer-motion";
import {
    Image,
    Video,
    FileText,
    Music,
    Paperclip,
    Users,
    Phone,
    PhoneMissed,
} from "lucide-react";

const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const ChatCard = ({
    chat,
    selected,
    onClick,
}) => {

    const loggedInUserId = localStorage.getItem("userId");
    const otherUser = chat.participants?.find(
        (user) => user._id !== loggedInUserId
    );

    const displayName = chat.isGroup
        ? chat.groupName
        : (otherUser?.username
            ? otherUser.username.charAt(0).toUpperCase() + otherUser.username.slice(1)
            : "Unknown User");

    const displayAvatar = chat.isGroup ? chat.groupAvatar : otherUser?.avatar;

    const getAttachmentPreview = (attachment) => {

        switch (attachment.fileType) {

            case "image":
                return (
                    <span className="flex items-center gap-2">
                        <Image size={15} className="text-cyan-400" />
                        Photo
                    </span>
                );

            case "video":
                return (
                    <span className="flex items-center gap-2">
                        <Video size={15} className="text-cyan-400" />
                        Video
                    </span>
                );

            case "audio":
                return (
                    <span className="flex items-center gap-2">
                        <Music size={15} className="text-cyan-400" />
                        Audio
                    </span>
                );

            case "document":
                return (
                    <span className="flex items-center gap-2">
                        <FileText size={15} className="text-cyan-400" />
                        {attachment.fileName}
                    </span>
                );

            default:
                return (
                    <span className="flex items-center gap-2">
                        <Paperclip size={15} className="text-cyan-400" />
                        Attachment
                    </span>
                );
        }

    };

    const getCallPreview = (lastMessage) => {
        const { callType, status, duration } = lastMessage.callInfo || {};
        const isMissed = status === "missed" || status === "declined" || status === "cancelled";
        const Icon = callType === "video" ? Video : (isMissed ? PhoneMissed : Phone);

        const label =
            status === "missed" ? "Missed call" :
                status === "declined" ? "Call declined" :
                    status === "cancelled" ? "Call cancelled" :
                        `${callType === "video" ? "Video" : "Voice"} call · ${formatDuration(duration || 0)}`;

        return (
            <span className={`flex items-center gap-2 ${isMissed ? "text-red-400" : ""}`}>
                <Icon size={15} className={isMissed ? "text-red-400" : "text-cyan-400"} />
                {label}
            </span>
        );
    };

    const hasUnread = chat.unreadCount > 0;

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition
            ${selected
                    ? "border border-cyan-400 bg-cyan-500/10"
                    : "border border-transparent bg-white/5 hover:border-cyan-400 hover:bg-white/10"
                }`}
        >
            <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white">
                    {displayAvatar ? (
                        <img
                            src={displayAvatar}
                            alt={displayName}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : chat.isGroup ? (
                        <Users size={22} />
                    ) : (
                        displayName?.charAt(0).toUpperCase() || "?"
                    )}
                </div>

                {!chat.isGroup && chat.online && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0B1523] bg-green-400" />
                )}
            </div>
            <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between">

                    <h3 className={`truncate ${hasUnread ? "font-bold text-white" : "font-semibold text-white"}`}>
                        {displayName}
                    </h3>

                    <span className="text-xs text-slate-400">
                        {chat.lastMessageAt
                            ? new Date(chat.lastMessageAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : ""}
                    </span>

                </div>

                <div className="mt-1 flex items-center justify-between gap-2">

                    <div className={`truncate text-sm ${hasUnread ? "text-slate-200" : "text-slate-400"}`}>

                        {chat.lastMessage?.messageType === "call" ? (

                            getCallPreview(chat.lastMessage)

                        ) : chat.lastMessage?.content ? (

                            chat.isGroup && chat.lastMessage?.sender?.username
                                ? `${chat.lastMessage.sender.username}: ${chat.lastMessage.content}`
                                : chat.lastMessage.content

                        ) : chat.lastMessage?.attachments?.length > 0 ? (

                            getAttachmentPreview(chat.lastMessage.attachments[0])

                        ) : (

                            "Start chatting..."

                        )}

                    </div>

                    {hasUnread && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-xs font-semibold text-white shadow-[0_0_10px_rgba(34,211,238,.5)]">
                            {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                        </span>
                    )}

                </div>

            </div>
        </motion.div>
    );
};

export default ChatCard;    
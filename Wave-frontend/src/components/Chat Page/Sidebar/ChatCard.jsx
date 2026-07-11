import { motion } from "framer-motion";
import {
    Image,
    Video,
    FileText,
    Music,
    Paperclip,
} from "lucide-react";

const ChatCard = ({
    chat,
    selected,
    onClick,
}) => {

    const loggedInUserId = localStorage.getItem("userId");
    const otherUser = chat.participants?.find(
        (user) => user._id !== loggedInUserId
    );
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
                    {otherUser?.avatar ? (
                        <img
                            src={otherUser.avatar}
                            alt={otherUser.username}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        otherUser?.username?.charAt(0).toUpperCase() || "?"
                    )}
                </div>

                {otherUser?.online && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0B1523] bg-green-400" />
                )}
            </div>
            <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between">

                    <h3 className="truncate font-semibold text-white">
                        {otherUser?.username.charAt(0).toUpperCase() + otherUser?.username.slice(1) || "Unknown User"}
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

                <div className="mt-1">

                    <div className="truncate text-sm text-slate-400">

                        {chat.lastMessage?.content ? (

                            chat.lastMessage.content

                        ) : chat.lastMessage?.attachments?.length > 0 ? (

                            getAttachmentPreview(chat.lastMessage.attachments[0])

                        ) : (

                            "Start chatting..."

                        )}

                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ChatCard;
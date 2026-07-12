import { useState } from "react";
import { Check, CheckCheck, Pencil, Trash2, SmilePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { editMessage, deleteMessage, toggleReaction } from "../../../api/messageApi";

const QUICK_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

const MessageBubble = ({ message, isGroup = false }) => {

    const loggedInUserId = localStorage.getItem("userId");
    const isMe = message.sender?._id === loggedInUserId;

    const [localMessage, setLocalMessage] = useState(message);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.content || "");
    const [showReactions, setShowReactions] = useState(false);
    const [saving, setSaving] = useState(false);

    const senderName = isMe
        ? "You"
        : (localMessage.sender?.username
            ? localMessage.sender.username.charAt(0).toUpperCase() + localMessage.sender.username.slice(1)
            : "Unknown");

    const handleSaveEdit = async () => {
        const trimmed = editText.trim();
        if (!trimmed || trimmed === localMessage.content) {
            setIsEditing(false);
            setEditText(localMessage.content || "");
            return;
        }
        try {
            setSaving(true);
            const updated = await editMessage(localMessage._id, trimmed);
            setLocalMessage((prev) => ({ ...prev, ...updated }));
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditText(localMessage.content || "");
        setIsEditing(false);
    };

    const handleDeleteClick = async () => {
        try {
            await deleteMessage(localMessage._id);
            setLocalMessage((prev) => ({
                ...prev,
                isDeleted: true,
                content: "",
                attachments: [],
                reactions: [],
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleReactClick = async (emoji) => {
        setShowReactions(false);
        try {
            const { reactions } = await toggleReaction(localMessage._id, emoji);
            setLocalMessage((prev) => ({ ...prev, reactions }));
        } catch (error) {
            console.log(error);
        }
    };

    const groupedReactions = (localMessage.reactions || []).reduce((acc, r) => {
        const existing = acc.find((g) => g.emoji === r.emoji);
        const userId = r.user?._id || r.user;
        if (existing) {
            existing.count += 1;
            if (userId === loggedInUserId) existing.mine = true;
        } else {
            acc.push({ emoji: r.emoji, count: 1, mine: userId === loggedInUserId });
        }
        return acc;
    }, []);

    if (localMessage.isDeleted) {
        return (
            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[70%] rounded-[26px] border border-white/10 bg-white/5 px-5 py-3 italic text-slate-500">
                    This message was deleted
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`group flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
        >
            {isMe && (
                <div className="flex items-center gap-1 self-center opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                        title="Edit"
                    >
                        <Pencil size={14} />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-red-400"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            <div className={`flex max-w-[70%] flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>

                <div className="relative w-fit max-w-full">
                    <div
                        className={`rounded-[26px] px-5 py-4 shadow-lg ${isMe
                            ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                            : "border border-white/10 bg-white/5 text-slate-100 backdrop-blur-xl"
                            }`}
                    >
                        {isGroup && !isMe && (
                            <p className="mb-1 text-xs font-semibold text-cyan-300">
                                {senderName}
                            </p>
                        )}

                        {isEditing ? (
                            <div className="space-y-2">
                                <textarea
                                    autoFocus
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    disabled={saving}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSaveEdit();
                                        }
                                        if (e.key === "Escape") handleCancelEdit();
                                    }}
                                    className="w-full resize-none rounded-lg bg-black/20 p-2 text-sm text-white outline-none disabled:opacity-50"
                                    rows={2}
                                />
                                <div className="flex justify-end gap-2 text-xs">
                                    <button onClick={handleCancelEdit} disabled={saving} className="flex items-center gap-1 opacity-80 hover:opacity-100 disabled:opacity-40">
                                        <X size={12} /> Cancel
                                    </button>
                                    <button onClick={handleSaveEdit} disabled={saving} className="font-semibold opacity-90 hover:opacity-100 disabled:opacity-40">
                                        {saving ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            localMessage.content && <p className="leading-7 whitespace-pre-wrap wrap-break-words">{localMessage.content}</p>
                        )}

                        {localMessage.attachments?.length > 0 && (
                            <div className="mt-3 space-y-3">
                                {localMessage.attachments.map((attachment) => {
                                    if (attachment.fileType === "image") {
                                        return (
                                            <img
                                                key={attachment._id}
                                                src={attachment.url}
                                                alt={attachment.fileName}
                                                className="max-h-80 w-full rounded-2xl object-cover"
                                            />
                                        );
                                    }
                                    if (attachment.fileType === "video") {
                                        return (
                                            <video key={attachment._id} controls className="max-h-80 w-full rounded-2xl">
                                                <source src={attachment.url} type={attachment.mimeType} />
                                            </video>
                                        );
                                    }
                                    if (attachment.fileType === "audio") {
                                        return (
                                            <audio key={attachment._id} controls className="w-full">
                                                <source src={attachment.url} type={attachment.mimeType} />
                                            </audio>
                                        );
                                    }
                                    return (
                                        <a
                                            key={attachment._id}
                                            href={attachment.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"
                                        >
                                            📄
                                            <span className="truncate">{attachment.fileName}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        )}

                        <div
                            className={`mt-2 flex items-center gap-1 text-xs ${isMe ? "justify-end text-cyan-100" : "justify-end text-slate-400"
                                }`}
                        >
                            {localMessage.isEdited && <span className="italic">edited</span>}

                            {new Date(localMessage.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}

                            {isMe &&
                                (localMessage.seenBy?.length > 0 ? (
                                    <CheckCheck size={14} />
                                ) : (
                                    <Check size={14} />
                                ))}
                        </div>
                    </div>

                    {showReactions && (
                        <div
                            className={`absolute z-10 -top-10 flex gap-1 rounded-full border border-white/10 bg-[#101d2c] p-1 shadow-lg ${isMe ? "right-0" : "left-0"
                                }`}
                            onMouseLeave={() => setShowReactions(false)}
                        >
                            {QUICK_EMOJIS.map((emoji) => (
                                <button
                                    key={emoji}
                                    onClick={() => handleReactClick(emoji)}
                                    className="rounded-full p-1 text-lg hover:scale-125 transition-transform"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {groupedReactions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {groupedReactions.map((g) => (
                            <button
                                key={g.emoji}
                                onClick={() => handleReactClick(g.emoji)}
                                className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${g.mine
                                    ? "border-cyan-400 bg-cyan-500/20"
                                    : "border-white/10 bg-white/5"
                                    }`}
                            >
                                <span>{g.emoji}</span>
                                <span className="text-slate-300">{g.count}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center self-center opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    onClick={() => setShowReactions((s) => !s)}
                    className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                    title="React"
                >
                    <SmilePlus size={14} />
                </button>
            </div>
        </motion.div >
    );
};

export default MessageBubble;
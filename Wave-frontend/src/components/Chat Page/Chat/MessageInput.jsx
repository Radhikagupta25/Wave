import {
    Smile,
    Paperclip,
    SendHorizontal,
    Mic
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { sendMessage } from "../../../api/messageApi";
import { uploadAttachment } from "../../../api/attachmentApi";
import { socket } from "../../../services/socket";

const TYPING_TIMEOUT = 2000;

const MessageInput = ({ chat, setMessages, fetchConversations }) => {

    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const loggedInUserId = localStorage.getItem("userId");

    const stopTyping = () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
        }
        socket.emit("stop-typing", { conversationId: chat._id, userId: loggedInUserId });
    };

    const handleChange = (e) => {
        setMessage(e.target.value);

        socket.emit("typing", { conversationId: chat._id, userId: loggedInUserId });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stop-typing", { conversationId: chat._id, userId: loggedInUserId });
            typingTimeoutRef.current = null;
        }, TYPING_TIMEOUT);
    };

    const handleSend = async () => {
        if (sending) return;
        if (!message.trim() && !selectedFile) return;
        setSending(true);
        stopTyping();
        try {
            let attachments = [];
            if (selectedFile) {
                const uploaded = await uploadAttachment(selectedFile);
                attachments.push(uploaded.data.data._id);
            }

            const res = await sendMessage({
                conversationId: chat._id,
                content: message,
                attachments,
            });

            setMessages(prev => {
                if (prev.some(m => m._id === res.data.data._id)) return prev;
                return [...prev, res.data.data];
            });

            setMessage("");
            setSelectedFile(null);
            fileInputRef.current.value = "";
            await fetchConversations();

        } catch (error) {
            console.log(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="border-t border-white/10 bg-[#08131F]/95 px-3 py-3">
            {selectedFile && (
                <div className="mb-3 rounded-2xl border border-cyan-400/30 bg-white/5 p-4">
                    <p>📎 {selectedFile.name}</p>
                    <button
                        onClick={() => {
                            setSelectedFile(null);
                            fileInputRef.current.value = "";
                        }}
                        className="text-red-400 hover:text-red-300"
                    >
                        Remove
                    </button>
                </div>
            )}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                <button className="text-slate-400 hover:text-cyan-300" onClick={() => fileInputRef.current.click()}>
                    <Paperclip size={20} />
                </button>
                <input
                    value={message}
                    onChange={handleChange}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent py-2 text-white outline-none placeholder:text-slate-500"
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button
                    disabled={sending}
                    onClick={handleSend}
                    className="rounded-xl bg-linear-to-r from-cyan-400 to-blue-600 p-2 text-white shadow-lg shadow-cyan-500/30"
                >
                    {sending ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        <SendHorizontal size={20} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
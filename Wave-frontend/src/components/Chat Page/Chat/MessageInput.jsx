import {
    Smile,
    Paperclip,
    SendHorizontal,
    Mic
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const MessageInput = ({ chat }) => {

    const [message, setMessage] = useState("");

    return (

        <div className="border-t border-white/10 bg-[#08131F]/90 px-8 py-5 backdrop-blur-xl">

            <div className="mx-auto flex max-w-5xl items-end gap-3">
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: .95 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                >

                    <Smile size={22} />

                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: .95 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                >

                    <Paperclip size={22} />

                </motion.button>

                {/* Input */}

                <textarea
                    rows={1}
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Type a message..."
                    className="max-h-40 flex-1 resize-none rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />

                {/* Mic */}

                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: .95 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                >

                    <Mic size={22} />

                </motion.button>

                {/* Send */}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: .95 }}
                    className="rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 p-3 text-white shadow-[0_0_25px_rgba(34,211,238,.35)]"
                >

                    <SendHorizontal size={22} />

                </motion.button>

            </div>

        </div>

    );

};

export default MessageInput;
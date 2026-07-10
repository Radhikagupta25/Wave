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
        <div className="border-t border-white/10 bg-[#08131F]/95 px-3 py-3">

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">

                <button className="text-slate-400 hover:text-cyan-300">

                    <Paperclip size={20} />

                </button>

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent py-2 text-white outline-none placeholder:text-slate-500"
                />

                <button
                    className="rounded-xl bg-linear-to-r from-cyan-400 to-blue-600 p-2 text-white shadow-lg shadow-cyan-500/30"
                >

                    <SendHorizontal size={20} />

                </button>

            </div>

        </div>
    );

};

export default MessageInput;
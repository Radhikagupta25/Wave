import {
    Phone,
    Video,
    Search,
    MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

const ChatHeader = ({ chat }) => {
    return (
        <div className="flex h-20 items-center justify-between border-b border-white/10 bg-[#08131F]/80 px-8 backdrop-blur-xl">

            {/* Left */}

            <div className="flex items-center gap-4">

                <div className="relative">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-lg font-semibold text-white">

                        {chat?.name?.[0]}

                    </div>

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#08131F] bg-green-400" />

                </div>

                <div>

                    <h2 className="text-lg font-semibold text-white">

                        {chat?.name}

                    </h2>

                    <p className="text-sm text-green-400">

                        {chat?.online ? "Online" : "Offline"}

                    </p>

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-3">

                {[
                    Search,
                    Phone,
                    Video,
                    MoreVertical
                ].map((Icon, index) => (

                    <motion.button
                        key={index}
                        whileHover={{
                            scale: 1.08
                        }}
                        whileTap={{
                            scale: .95
                        }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                    >

                        <Icon size={20} />

                    </motion.button>

                ))}

            </div>

        </div>
    );
};

export default ChatHeader;
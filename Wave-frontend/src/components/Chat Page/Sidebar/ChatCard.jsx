import { motion } from "framer-motion";

const ChatCard = ({
    chat,
    selected,
    onClick,
}) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{
                scale: 1.02,
            }}
            whileTap={{
                scale: .98,
            }}
            className={`flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition
${selected
                    ? "border border-cyan-400 bg-cyan-500/10"
                    : "border border-transparent bg-white/5 hover:border-cyan-400 hover:bg-white/10"
                }`}
        >
            <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-lg font-bold">

                    {chat.name[0]}

                </div>

                {chat.online && (

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0B1523] bg-green-400" />

                )}

            </div>
            <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between">

                    <h3 className="truncate font-semibold text-white">

                        {chat.name}

                    </h3>

                    <span className="text-xs text-slate-400">

                        {chat.time}

                    </span>

                </div>

                <div className="mt-1 flex items-center justify-between">

                    <p className="truncate text-sm text-slate-400">

                        {chat.lastMessage}

                    </p>

                    {chat.unread > 0 && (

                        <div className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-black">

                            {chat.unread}

                        </div>

                    )}

                </div>

            </div>

        </motion.div>
    );
};

export default ChatCard;
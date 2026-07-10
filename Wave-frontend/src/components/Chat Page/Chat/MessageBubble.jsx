import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const MessageBubble = ({ message }) => {

    const isMe = message.sender === "me";

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: .25,
            }}

            className={`flex ${isMe
                    ? "justify-end"
                    : "justify-start"
                }`}

        >

            <div

                className={`max-w-[70%] rounded-[26px] px-5 py-4 shadow-lg

                ${isMe

                        ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white"

                        : "border border-white/10 bg-white/5 text-slate-100 backdrop-blur-xl"

                    }`}

            >

                <p className="leading-7">

                    {message.text}

                </p>

                <div

                    className={`mt-2 flex items-center gap-1 text-xs

                    ${isMe
                            ? "justify-end text-cyan-100"
                            : "justify-end text-slate-400"
                        }`}

                >

                    {message.time}

                    {isMe && (

                        message.seen

                            ?

                            <CheckCheck
                                size={14}
                            />

                            :

                            <Check
                                size={14}
                            />

                    )}

                </div>

            </div>

        </motion.div>

    );

};

export default MessageBubble;
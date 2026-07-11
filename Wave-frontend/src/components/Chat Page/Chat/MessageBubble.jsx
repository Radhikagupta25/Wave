import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const MessageBubble = ({ message }) => {

    const loggedInUserId = localStorage.getItem("userId");
    const isMe = message.sender._id === loggedInUserId;

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

                    {message.content}

                </p>
                {message.attachments?.length > 0 && (

                    <div className="mt-3 space-y-3">

                        {message.attachments.map((attachment) => {

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
                                    <video
                                        key={attachment._id}
                                        controls
                                        className="max-h-80 w-full rounded-2xl"
                                    >
                                        <source
                                            src={attachment.url}
                                            type={attachment.mimeType}
                                        />
                                    </video>
                                );
                            }

                            if (attachment.fileType === "audio") {

                                return (
                                    <audio
                                        key={attachment._id}
                                        controls
                                        className="w-full"
                                    >
                                        <source
                                            src={attachment.url}
                                            type={attachment.mimeType}
                                        />
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

                                    <span className="truncate">

                                        {attachment.fileName}

                                    </span>

                                </a>

                            );

                        })}

                    </div>

                )}

                <div

                    className={`mt-2 flex items-center gap-1 text-xs

                    ${isMe
                            ? "justify-end text-cyan-100"
                            : "justify-end text-slate-400"
                        }`}

                >

                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}

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
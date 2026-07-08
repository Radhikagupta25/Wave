import { motion } from "framer-motion";
import { CheckCheck, MoreVertical, Phone, Video } from "lucide-react";

const messages = [
    {
        id: 1,
        sender: "other",
        text: "Hey Radhika 👋",
    },
    {
        id: 2,
        sender: "me",
        text: "Hey!!",
    },
    {
        id: 3,
        sender: "other",
        text: "Wave looks amazing 🌊",
    },
];

const FloatingPhone = () => {
    return (
        <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative hidden lg:flex lg:w-auto lg:justify-center"    >
            <div className="absolute -inset-8 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/5 p-4 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-3xl">
                <div className="mx-auto mb-5 h-2 w-24 rounded-full bg-slate-700" />
                <div className="flex items-center justify-between border-b border-white/10 pb-4">

                    <div className="flex items-center gap-3">

                        <div className="relative">

                            <img
                                src="https://i.pravatar.cc/100?img=32"
                                alt=""
                                className="h-11 w-11 rounded-full object-cover"
                            />

                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#06131F] bg-green-400" />

                        </div>

                        <div>

                            <h3 className="font-semibold text-white">
                                User
                            </h3>

                            <p className="text-xs text-cyan-300">
                                Online
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 text-slate-300">

                        <Phone size={18} />

                        <Video size={18} />

                        <MoreVertical size={18} />

                    </div>

                </div>
                <div className="mt-6 flex flex-col gap-4">

                    {messages.map((msg, index) => (

                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.5 }}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >

                            <div
                                className={`max-w-[75%] rounded-3xl px-4 py-3 text-sm ${msg.sender === "me"
                                        ? "rounded-br-md bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                                        : "rounded-bl-md bg-white/10 text-slate-200"
                                    }`}
                            >
                                {msg.text}
                            </div>

                        </motion.div>

                    ))}
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex justify-start"
                    >

                        <div className="rounded-3xl rounded-bl-md bg-white/10 px-4 py-3">

                            <div className="flex gap-1">

                                <span className="h-2 w-2 rounded-full bg-cyan-300" />

                                <span className="h-2 w-2 rounded-full bg-cyan-300" />

                                <span className="h-2 w-2 rounded-full bg-cyan-300" />

                            </div>

                        </div>

                    </motion.div>

                </div>
                <div className="mt-6 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3">

                    <span className="text-sm text-slate-400">
                        Type a message...
                    </span>

                    <CheckCheck className="text-cyan-400" size={20} />

                </div>

            </div>

        </motion.div>
    );
};

export default FloatingPhone;
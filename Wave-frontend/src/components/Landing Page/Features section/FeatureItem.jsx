import { motion } from "framer-motion";

const FeatureItem = ({ feature, reverse }) => {
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className={`group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/8 hover:shadow-[0_0_60px_rgba(34,211,238,.12)]`}
        >

            <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-cyan-400/10 blur-[120px] transition-all duration-500 group-hover:bg-cyan-400/20" />

            <div className={`relative flex flex-col items-center gap-4 p-4 sm:p-5 lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""}`}>

                <motion.div
                    whileHover={{ scale: 1.08, rotate: -8 }}
                    transition={{ duration: .3 }}
                    className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-[0_10px_30px_rgba(34,211,238,.25)]"
                >
                    <Icon size={24} />
                </motion.div>

                <div className={`flex-1 ${reverse ? "lg:text-right" : "lg:text-left"} text-center`}>

                    <h3 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                        {feature.title}
                    </h3>

                    <p
                        className={`mt-2 text-sm leading-5 text-slate-300 sm:text-[15px] sm:leading-6 ${reverse
                                ? "ml-auto lg:max-w-2xl"
                                : "mr-auto lg:max-w-xl"
                            }`}
                    >
                        {feature.description}
                    </p>

                </div>

                <div className="hidden lg:flex lg:w-40 lg:justify-center">

                    {feature.title === "Real-Time Messaging" && (

                        <div className="rounded-3xl border border-white/10 bg-[#102437] p-3">

                            <div className="mb-2 flex justify-start">

                                <div className="rounded-2xl rounded-bl-sm bg-white/10 px-3 py-1.5 text-sm text-white">
                                    Hey 👋
                                </div>

                            </div>

                            <div className="flex justify-end">

                                <div className="rounded-2xl rounded-br-sm bg-cyan-500 px-4 py-2 text-sm text-white">
                                    Hello!!
                                </div>

                            </div>

                        </div>

                    )}

                    {feature.title === "Secure Authentication" && (

                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10">

                            <Icon size={34} className="text-cyan-300" />

                        </div>

                    )}

                    {feature.title === "Share Everything" && (

                        <div className="grid grid-cols-2 gap-2">

                            {["📷", "🎥", "🎵", "📄"].map((item) => (

                                <div key={item} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-xl">

                                    {item}

                                </div>

                            ))}

                        </div>

                    )}

                    {feature.title === "Group Conversations" && (

                        <div className="flex -space-x-3">

                            {[1, 2, 3, 4].map((i) => (
                                <img
                                    key={i}
                                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                    className="h-10 w-10 rounded-full border-4 border-[#06131F]"
                                    alt=""
                                />
                            ))}

                        </div>

                    )}

                    {feature.title === "Lightning Fast" && (

                        <div className="flex flex-col items-center">

                            <div className="text-3xl font-black text-cyan-300">

                                0.1s

                            </div>

                            <p className="mt-1 text-slate-400">

                                Average Latency

                            </p>

                        </div>

                    )}

                </div>

            </div>
        </motion.div>
    );
};

export default FeatureItem;
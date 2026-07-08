import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import BackgroundBlobs from "./Hero section/BackgroundBlobs";
import BubbleParticles from "./Hero section/BubbleParticles";

const About = () => {
    return (
        <section className="relative overflow-hidden bg-[#06131F] py-24 sm:py-28 lg:py-32">

            <BackgroundBlobs />
            <BubbleParticles />

            <div className="relative z-10 mx-auto flex max-w-375 flex-col items-center gap-16 px-6 sm:px-8 lg:flex-row lg:gap-24 lg:px-10">

                {/* Left */}

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .7 }}
                    className="flex-1"
                >

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                        About Wave
                    </span>

                    <h2 className="mt-8 text-4xl font-black text-white sm:text-5xl lg:text-6xl">

                        Conversations,

                        <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">

                            {" "}Reimagined.

                        </span>

                    </h2>

                    <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">

                        Wave is a modern real-time messaging platform built to make communication effortless.
                        From private conversations and group chats to media sharing and live presence,
                        every interaction is designed to feel smooth, intuitive, and beautifully connected.

                    </p>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

                        Crafted with performance, security, and user experience at its core,
                        Wave combines modern web technologies with thoughtful design to create
                        conversations that simply flow.

                    </p>

                </motion.div>

                {/* Right */}

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .7 }}
                    className="grid w-full max-w-xl gap-5"
                >

                    <div className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white">

                            <Zap size={28} />

                        </div>

                        <div>

                            <h3 className="text-xl font-semibold text-white">
                                Real-Time Performance
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Instant messaging powered by modern real-time technologies.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white">

                            <ShieldCheck size={28} />

                        </div>

                        <div>

                            <h3 className="text-xl font-semibold text-white">
                                Secure by Design
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Authentication, encrypted sessions and protected user data.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white">

                            <Sparkles size={28} />

                        </div>

                        <div>

                            <h3 className="text-xl font-semibold text-white">
                                Crafted Experience
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Every interaction is designed to feel elegant, responsive and enjoyable.
                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default About;
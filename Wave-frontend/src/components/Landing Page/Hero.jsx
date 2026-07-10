import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedText from "./Hero section/AnimatedText";
import BackgroundBlobs from "./Hero section/BackgroundBlobs";
import BubbleParticles from "./Hero section/BubbleParticles";
import FloatingPhone from "./Hero section/FloatingPhone";
import FloatingStats from "./FloatingStats";

const Hero = () => {
    return (
        <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#030712] pt-28">

            <BackgroundBlobs />

            <BubbleParticles />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 py-16 sm:px-8 md:px-10 lg:flex-row lg:gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-2xl text-center lg:text-left"
                >

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .4 }}
                        className="text-5xl font-black leading-tight text-white sm:text-6xl md:text-6xl lg:text-7xl"
                    >
                        Ride the{" "}
                        <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                            Wave
                        </span>
                    </motion.h1>

                    <div className="mt-8">
                        <AnimatedText />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .8 }}
                        className="mx-auto mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg md:text-xl lg:mx-0"
                    >Where every message flows naturally, every interaction feels effortless, and every conversation matters.
                    </motion.p>

                    {/* Buttons */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
                    >

                        <button className="group flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-600 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,.5)] sm:w-auto">

                            Get Started

                            <ArrowRight className="transition group-hover:translate-x-1" size={20} />

                        </button>

                        <button className="w-full rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-xl transition hover:border-cyan-400 hover:bg-cyan-500/10 sm:w-auto">

                            <a href="https://github.com/Radhikagupta25/Wave" target="_blank">Github</a>

                        </button>

                    </motion.div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: .3 }}
                    className="relative flex w-full justify-center lg:w-auto"
                >

                    <FloatingStats />

                    <FloatingPhone />

                </motion.div>

            </div>

        </section>
    );
};

export default Hero;
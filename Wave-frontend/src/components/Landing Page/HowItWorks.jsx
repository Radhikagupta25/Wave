import { motion } from "framer-motion";
import { UserPlus, MessageCircleMore, Sparkles } from "lucide-react";
import BackgroundBlobs from "./Hero section/BackgroundBlobs";
import BubbleParticles from "./Hero section/BubbleParticles";

const steps = [
    {
        icon: UserPlus,
        title: "Create an Account",
        description:
            "Sign up in seconds using email or Google and verify your account securely.",
    },
    {
        icon: MessageCircleMore,
        title: "Start Conversations",
        description:
            "Connect with friends, create groups, and enjoy real-time messaging instantly.",
    },
    {
        icon: Sparkles,
        title: "Experience Wave",
        description:
            "Share media, react to messages, and collaborate effortlessly in one place.",
    },
];

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden bg-[#030712] py-24 sm:py-28 lg:py-32">

            <BackgroundBlobs />
            <BubbleParticles />

            <div className="relative z-10 mx-auto max-w-375 px-6 sm:px-8 lg:px-10">

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .7 }}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                        Getting Started
                    </span>

                    <h2 className="mt-8 text-4xl font-black text-white sm:text-5xl lg:text-6xl">

                        Start in

                        <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                            {" "}Three Simple Steps
                        </span>

                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Everything is designed to get you connected in less than a minute.
                    </p>

                </motion.div>

                {/* Steps */}

                <div className="relative grid gap-8 lg:grid-cols-3">

                    {/* Desktop Connector */}

                    <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-linear-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0 lg:block" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                whileHover={{ y: -8 }}
                                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-[0_0_50px_rgba(34,211,238,.15)]"
                            >

                                {/* Step Number */}

                                <div className="absolute right-5 top-5 text-6xl font-black text-white/5">
                                    0{index + 1}
                                </div>

                                {/* Icon */}

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-[0_10px_30px_rgba(34,211,238,.35)]">

                                    <Icon size={30} />

                                </div>

                                {/* Title */}

                                <h3 className="mt-6 text-2xl font-bold text-white">

                                    {step.title}

                                </h3>

                                {/* Description */}

                                <p className="mt-4 text-slate-300 leading-7">

                                    {step.description}

                                </p>

                            </motion.div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
};

export default HowItWorks;
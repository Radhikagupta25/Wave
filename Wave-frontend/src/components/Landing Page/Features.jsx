import { motion } from "framer-motion";
import BackgroundBlobs from "./Hero section/BackgroundBlobs";
import BubbleParticles from "./Hero section/BubbleParticles";
import FeatureItem from "./Features section/FeatureItem";
import { features } from "./Features section/featuresData";

const Features = () => {
    return (
        <section className="relative overflow-hidden bg-[#04060e] py-28">

            <BackgroundBlobs />
            <BubbleParticles />

            <div className="relative z-10 mx-auto max-w-375 px-6 sm:px-8 lg:px-10">

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .8 }}
                    className="mx-auto mb-24 max-w-3xl text-center"
                >

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                        Why Choose Wave
                    </span>

                    <h2 className="mt-8 text-4xl font-black text-white sm:text-5xl lg:text-6xl">

                        Built for{" "}

                        <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">

                            Modern Conversations

                        </span>

                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">

                        Every feature in Wave is designed to make conversations
                        faster, smoother and more enjoyable.

                    </p>

                </motion.div>

                {/* Features */}

                <div className="space-y-10">

                    {features.map((feature, index) => (

                        <FeatureItem
                            key={feature.id}
                            feature={feature}
                            reverse={index % 2 !== 0}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Features;
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
    "Chat.",
    "Connect.",
    "Collaborate.",
    "Flow."
];

const AnimatedText = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex min-h-[24 w-full items-center justify-center lg:justify-start">            <AnimatePresence mode="wait">

            <motion.h1
                key={words[index]}
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -70, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute text-3xl font-black sm:text-6xl md:text-4xl lg:text-5xl bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent flex"
            >
                {words[index]}
            </motion.h1>

        </AnimatePresence>
        </div>
    );
};

export default AnimatedText;
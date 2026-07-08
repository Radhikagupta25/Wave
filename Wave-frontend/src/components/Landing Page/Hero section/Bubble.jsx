import { motion } from "framer-motion";

const Bubble = ({ size, left, delay, duration }) => {
    return (
        <motion.div
            initial={{
                y: 100,
                opacity: 0,
            }}
            animate={{
                y: -900,
                opacity: [0, .4, .15, 0],
                x: [0, 25, -15, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
            }}
            style={{
                left: `${left}%`,
                width: size,
                height: size,
            }}
            className="absolute bottom-0 rounded-full bg-cyan-300/20 backdrop-blur-xl"
        />
    );
};

export default Bubble;
import { motion } from "framer-motion";

const TypingIndicator = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-start"
        >
            <div className="flex items-center gap-1.5 rounded-[26px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
            </div>
        </motion.div>
    );
};

export default TypingIndicator;
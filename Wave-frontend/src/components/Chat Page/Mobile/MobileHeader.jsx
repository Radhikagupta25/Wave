import { MoreVertical, Waves } from "lucide-react";
import { motion } from "framer-motion";

const MobileHeader = ({ onMenuOpen }) => {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#08131F]/90 px-5 backdrop-blur-xl">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-600">

                    <Waves size={20} />

                </div>

                <div>

                    <h1 className="text-xl font-bold">
                        Wave
                    </h1>

                    <p className="text-xs text-slate-400">
                        Where conversations flow
                    </p>

                </div>

            </div>

            <motion.button
                whileTap={{ scale: .95 }}
                onClick={onMenuOpen}
                className="rounded-xl p-2 text-slate-300 hover:bg-white/5"
            >
                <MoreVertical size={22} />
            </motion.button>

        </header>
    );
};

export default MobileHeader;    
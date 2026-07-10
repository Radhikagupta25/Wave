import { Search, MoreVertical, MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";

const MobileHeader = ({ onMenuOpen }) => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#08131F]/90 px-5 py-4 backdrop-blur-xl lg:hidden">

            {/* Logo */}

            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,.35)]">

                    <MessageCircleMore
                        size={22}
                        className="text-white"
                    />

                </div>

                <h1 className="text-2xl font-bold text-white">

                    Wave

                </h1>

            </div>

            {/* Actions */}

            <div className="flex items-center gap-2">

                <motion.button
                    whileTap={{ scale: .95 }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl p-2 text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
                >

                    <Search size={22} />

                </motion.button>

                <motion.button
                    whileTap={{ scale: .95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={onMenuOpen}
                    className="rounded-xl p-2 text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
                >

                    <MoreVertical size={22} />

                </motion.button>

            </div>

        </header>
    );
};

export default MobileHeader;
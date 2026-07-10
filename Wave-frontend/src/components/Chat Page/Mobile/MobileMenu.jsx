import {
    User,
    UserPen,
    Users,
    Settings,
    Moon,
    LogOut,
    X
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ open, onClose }) => {

    const menuItems = [
        {
            icon: User,
            label: "My Profile",
        },
        {
            icon: UserPen,
            label: "Edit Profile",
        },
        {
            icon: Users,
            label: "Create Group",
        },
        {
            icon: Settings,
            label: "Settings",
        },
        {
            icon: Moon,
            label: "Theme",
        },
        {
            icon: LogOut,
            label: "Logout",
            danger: true,
        },
    ];

    return (

        <AnimatePresence>

            {open && (

                <>

                    {/* Backdrop */}

                    <motion.div

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        onClick={onClose}

                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"

                    />

                    {/* Drawer */}

                    <motion.div

                        initial={{
                            x: 300,
                        }}

                        animate={{
                            x: 0,
                        }}

                        exit={{
                            x: 300,
                        }}

                        transition={{
                            type: "spring",
                            damping: 24,
                        }}

                        className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/10 bg-[#0B1523] shadow-2xl"

                    >

                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                            <h2 className="text-lg font-semibold text-white">

                                Menu

                            </h2>

                            <button
                                onClick={onClose}
                            >

                                <X
                                    className="text-slate-400 hover:text-white"
                                />

                            </button>

                        </div>

                        {/* Items */}

                        <div className="p-3">

                            {menuItems.map((item) => {

                                const Icon = item.icon;

                                return (

                                    <button

                                        key={item.label}

                                        className={`mb-2 flex w-full items-center gap-4 rounded-2xl px-4 py-4 transition

                                        ${item.danger

                                                ? "text-red-400 hover:bg-red-500/10"

                                                : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"

                                            }`}

                                    >

                                        <Icon size={21} />

                                        {item.label}

                                    </button>

                                );

                            })}

                        </div>

                    </motion.div>

                </>

            )}

        </AnimatePresence>

    );

};

export default MobileMenu;
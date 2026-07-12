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
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApi";
import { socket } from "../../../services/socket";

const MobileMenu = ({ open, onClose }) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        onClose();
        try {
            await logoutUser();
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("userId");
            socket.disconnect();
            navigate("/login");
        }
    };

    const menuItems = [
        {
            icon: User,
            label: "My Profile",
            onClick: () => {
                onClose();
                navigate("/profile");
            },
        },
        {
            icon: UserPen,
            label: "Edit Profile",
            onClick: () => {
                onClose();
                navigate("/edit-profile");
            },
        },
        {
            icon: Users,
            label: "Create Group",
            onClick: () => {
                onClose();
                navigate("/new-group");
            },
        },
        {
            icon: LogOut,
            label: "Logout",
            danger: true,
            onClick: ()=>{
                handleLogout;
                navigate("/")
            }
        },
    ];

    return (

        <AnimatePresence>

            {open && (

                <>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: "spring", damping: 24 }}
                        className="fixed right-0 top-0 z-1000000 h-screen w-72 border-l border-white/10 bg-[#0B1523] shadow-2xl"
                    >

                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <h2 className="text-lg font-semibold text-white">Menu</h2>
                            <button onClick={onClose}>
                                <X className="text-slate-400 hover:text-white" />
                            </button>
                        </div>

                        <div className="p-3">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.label}
                                        onClick={item.onClick || onClose}
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
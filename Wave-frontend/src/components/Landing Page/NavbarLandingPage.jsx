import { useState } from "react";
import { Menu, X, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    {
        name: "Features",
        href: "#features",
    },
    {
        name: "How it Works",
        href: "#how-it-works",
    },
    {
        name: "About",
        href: "#about",
    },
    {
        name: "GitHub",
        href: "https://github.com/Radhikagupta25/Wave",
        external: true,
        target:"_blank"
    },
    {
        name: "Contact",
        href: "#contact",
        external: true,
    },
];

const NavbarLandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] xl:w-[85%]">

            <nav className="rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">

                <div className="flex items-center justify-between px-6 lg:px-8 h-16">
                    <a
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600">
                            <Waves className="text-white" size={20} />
                        </div>

                        <h1 className="text-2xl font-bold text-white">
                            Wave
                        </h1>
                    </a>

                    <div className="hidden lg:flex items-center gap-8">

                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : "_self"}
                                rel={link.external ? "noopener noreferrer" : ""}
                                className="relative text-slate-300 hover:text-cyan-300 transition duration-300 group"
                            >
                                {link.name}

                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}

                    </div>
                    <div className="hidden lg:flex items-center gap-3">

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full border border-white/10 px-5 py-2 text-white hover:border-cyan-400 transition"
                        >
                            Login
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-2 font-semibold text-white shadow-lg"
                        >
                            Get Started
                        </motion.button>

                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-white"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>

                </div>

            </nav>
            <AnimatePresence>

                {isOpen && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="mt-3 rounded-3xl border border-white/10 bg-[#08131f]/95 backdrop-blur-xl p-6 lg:hidden"
                    >

                        <div className="flex flex-col gap-6">

                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.external ? "_blank" : "_self"}
                                    rel={link.external ? "noopener noreferrer" : ""}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg text-slate-300 hover:text-cyan-300 transition"
                                >
                                    {link.name}
                                </a>
                            ))}

                            <div className="mt-2 flex flex-col gap-3">

                                <button className="w-full rounded-full border border-white/10 py-3 text-white">
                                    Login
                                </button>

                                <button className="w-full rounded-full bg-linear-to-r from-cyan-400 to-blue-600 py-3 font-semibold text-white">
                                    Get Started
                                </button>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </header>
    );
};

export default NavbarLandingPage;
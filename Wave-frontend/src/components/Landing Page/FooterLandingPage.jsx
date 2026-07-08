import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Waves, Heart } from "lucide-react";

const FooterLandingPage = () => {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#06131F]">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="relative mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600">

                                <Waves className="text-white" />

                            </div>

                            <h2 className="text-3xl font-bold text-white">

                                Wave

                            </h2>

                        </div>

                        <p className="mt-5 text-sm leading-7 text-slate-400">

                            Real-time conversations designed with
                            speed, simplicity, and beautiful user
                            experience in mind.

                        </p>

                    </div>
                    <div>

                        <h3 className="mb-5 text-lg font-semibold text-white">

                            Navigation

                        </h3>

                        <div className="space-y-3">

                            {[
                                "Features",
                                "How it Works",
                                "About",
                                "Login",
                            ].map((item) => (
                                <a
                                    key={item}
                                    href="/"
                                    className="block text-slate-400 transition hover:translate-x-1 hover:text-cyan-400"
                                >
                                    {item}
                                </a>
                            ))}

                        </div>

                    </div>
                    <div>

                        <h3 className="mb-5 text-lg font-semibold text-white">

                            Resources

                        </h3>

                        <div className="space-y-3">

                            {[
                                "GitHub",
                                "Documentation",
                                "Privacy",
                                "Terms",
                            ].map((item) => (
                                <a
                                    key={item}
                                    href="/"
                                    className="block text-slate-400 transition hover:translate-x-1 hover:text-cyan-400"
                                >
                                    {item}
                                </a>
                            ))}

                        </div>

                    </div>
                    <div>

                        <h3 className="mb-5 text-lg font-semibold text-white">

                            Connect

                        </h3>

                        <div className="flex gap-4">

                            <a
                                href="https://github.com/Radhikagupta25"
                                className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <FaGithub size={20} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <FaLinkedin size={20} />
                            </a>

                            <a
                                href="mailto:example@gmail.com"
                                className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                <Mail size={20} />
                            </a>

                        </div>

                    </div>

                </div>
                <div className="my-10 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">

                    <p className="text-sm text-slate-400">

                        © {new Date().getFullYear()} Wave.
                        All rights reserved.

                    </p>

                    <p className="flex items-center gap-2 text-sm text-slate-400">

                        Built with

                        <Heart
                            size={16}
                            className="fill-red-500 text-red-500"
                        />

                        by Radhika Gupta

                    </p>

                </div>

            </div>

        </footer>
    );
};

export default FooterLandingPage;
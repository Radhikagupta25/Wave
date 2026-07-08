import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className="w-full max-w-105 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl shadow-[0_20px_80px_rgba(34,211,238,.15)] sm:p-6"
        >

            <h1 className="text-3xl font-bold text-white">
                Welcome Back
            </h1>

            <p className="mt-3 text-slate-400">
                Continue your conversations with Wave.
            </p>

            <form className="mt-6 space-y-4">
                <div>

                    <label className="mb-2 block text-sm text-slate-300">
                        Email
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400">

                        <Mail size={18} className="text-cyan-300" />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        />

                    </div>

                </div>
                <div>

                    <label className="mb-2 block text-sm text-slate-300">
                        Password
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400">

                        <Lock size={18} className="text-cyan-300" />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-cyan-300"
                        >

                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}

                        </button>

                    </div>

                </div>
                <div className="flex items-center justify-between">

                    <label className="flex items-center gap-2 text-sm text-slate-300">

                        <input
                            type="checkbox"
                            className="accent-cyan-500"
                        />

                        Remember Me

                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-sm text-cyan-300 hover:text-cyan-200"
                    >

                        Forgot Password?

                    </Link>

                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: .97 }}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,.35)]"
                >

                    Sign In

                    <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                    />

                </motion.button>

            </form>

            <SocialLogin />

            <p className="mt-5 text-center text-slate-400">

                Don't have an account?{" "}

                <Link
                    to="/signup"
                    className="font-medium text-cyan-300 hover:text-cyan-200"
                >

                    Create Account

                </Link>

            </p>

        </motion.div>

    );
};

export default LoginForm;
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SocialLogin from "../Login Page/SocialLogin";
import { registerUser } from "../../api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await registerUser(formData);
            toast.success(response.data.message);
            setLoading(false);
            setTimeout(() => {
                navigate("/verify-email", {
                    state: {
                        email: formData.email,
                    }
                });
            }, 1000);
        }
        catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
            setLoading(false);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className="w-full max-w-105 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl shadow-[0_20px_80px_rgba(34,211,238,.15)] sm:p-6"
        >

            <h1 className="text-3xl font-bold text-white">
                Create Account
            </h1>

            <p className="mt-2 text-slate-400">
                Join Wave and start meaningful conversations.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>

                    <label className="mb-2 block text-sm text-slate-300">
                        Username
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400">

                        <User size={18} className="text-cyan-300" />

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your Username"
                            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        />

                    </div>

                </div>

                <div>

                    <label className="mb-2 block text-sm text-slate-300">
                        Email
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400">

                        <Mail size={18} className="text-cyan-300" />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
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

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.97 } : {}}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,.35)] disabled:cursor-not-allowed disabled:opacity-70"
                >

                    {loading ? (
                        <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Creating Account...
                        </>
                    ) : (
                        <>
                            Create Account

                            <ArrowRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />
                        </>
                    )}

                </motion.button>

            </form>

            <SocialLogin />

            <p className="mt-5 text-center text-slate-400">

                Already have an account?{" "}

                <Link
                    to="/login"
                    className="font-medium text-cyan-300 hover:text-cyan-200"
                >
                    Sign In
                </Link>

            </p>

        </motion.div>
    );
};

export default SignupForm;
import { useState } from "react";
import { Mail, ArrowRight, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";

const ForgotPasswordForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            return toast.error("Please enter your email.");
        }

        try {
            setLoading(true);

            const response = await forgotPassword({
                email,
            });

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/reset-password", {
                    state: {
                        email,
                    },
                });
            }, 1200);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to send OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl shadow-[0_20px_80px_rgba(34,211,238,.15)]"
        >
            <h1 className="text-4xl font-bold text-white">
                Forgot Password
            </h1>

            <p className="mt-3 text-slate-400 leading-7">
                We'll send a verification code to your email.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >
                <div>
                    <label className="mb-3 block text-sm text-slate-300">
                        Email
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition focus-within:border-cyan-400">
                        <Mail
                            size={20}
                            className="text-cyan-300"
                        />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: .97 } : {}}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,.35)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <LoaderCircle
                                size={20}
                                className="animate-spin"
                            />
                            Sending OTP...
                        </>
                    ) : (
                        <>
                            Send OTP

                            <ArrowRight
                                size={18}
                                className="transition group-hover:translate-x-1"
                            />
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ForgotPasswordForm;
import { useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    Lock,
    ArrowRight,
    LoaderCircle,
    Pencil
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPassword } from "../../api/authApi";

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email || "";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        otp: "",
        newPassword: "",
        confNewPassword: "",
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

        if (
            !formData.newPassword ||
            !formData.confNewPassword
        ) {
            return toast.error("Please fill all fields.");
        }

        if (
            formData.newPassword !==
            formData.confNewPassword
        ) {
            return toast.error("Passwords do not match.");
        }
        if (formData.otp.length !== 6) {
            return toast.error("Enter a valid OTP.");
        }

        if (!formData.newPassword || !formData.confNewPassword) {
            return toast.error("Please fill all fields.");
        }

        if (formData.newPassword !== formData.confNewPassword) {
            return toast.error("Passwords do not match.");
        }

        try {
            setLoading(true);

            const response = await resetPassword({
                email,
                otp: formData.otp,
                newPassword: formData.newPassword,
                confNewPassword: formData.confNewPassword,
            });

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl shadow-[0_20px_80px_rgba(34,211,238,.15)]"
        >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600">
                <Lock
                    size={36}
                    className="text-white"
                />
            </div>

            <h1 className="mt-6 text-center text-3xl font-bold text-white">
                Reset Password
            </h1>

            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-slate-300">
                <span>Create a new secure password for</span>

                <span className="font-semibold text-cyan-300 break-all">
                    {email}
                </span>

                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="inline-flex items-center gap-1 text-cyan-300 transition hover:text-cyan-200"
                >
                    <Pencil size={14} />
                    Edit
                </button>
            </p>
            <form
                className="mt-8 space-y-5"
                onSubmit={handleSubmit}
            >
                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Verification Code
                    </label>

                    <input
                        type="text"
                        name="otp"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                otp: e.target.value.replace(/\D/g, ""),
                            }))
                        }
                        placeholder="Enter 6-digit OTP"
                        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-xl text-white outline-none transition focus:border-cyan-400 ${formData.otp
                            ? "tracking-[0.5em]"
                            : "tracking-normal"
                            }`}
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        New Password
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400">
                        <Lock
                            size={18}
                            className="text-cyan-300"
                        />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="text-slate-400 hover:text-cyan-300"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Confirm Password
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-cyan-400">
                        <Lock
                            size={18}
                            className="text-cyan-300"
                        />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confNewPassword"
                            value={formData.confNewPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="text-slate-400 hover:text-cyan-300"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={
                        !loading
                            ? { scale: 1.02 }
                            : {}
                    }
                    whileTap={
                        !loading
                            ? { scale: 0.97 }
                            : {}
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,.35)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <LoaderCircle
                                size={20}
                                className="animate-spin"
                            />
                            Resetting...
                        </>
                    ) : (
                        <>
                            Reset Password
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

export default ResetPasswordForm;
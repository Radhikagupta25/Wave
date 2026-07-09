import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, LoaderCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyEmail } from "../../api/authApi";
import { resendVerificationOtp } from "../../api/authApi";

const VerifyEmailForm = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email || "";
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (otp.length !== 6) {
            return toast.error("Please enter a valid 6-digit OTP.");
        }

        setLoading(true);

        try {

            const response = await verifyEmail({
                email,
                otp,
            });

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/login",);
            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "OTP verification failed."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleResendOtp = async () => {

        try {

            const response = await resendVerificationOtp({
                email,
            });

            toast.success(response.data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to resend OTP."
            );

        }

    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl shadow-[0_20px_80px_rgba(34,211,238,.15)]"
        >

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600">

                <Mail
                    size={36}
                    className="text-white"
                />

            </div>

            <h1 className="mt-6 text-center text-3xl font-bold text-white">

                Verify Email

            </h1>

            <p className="mt-3 text-center text-slate-300">

                We've sent a verification code to

            </p>

            <p className="mt-1 break-all text-center font-semibold text-cyan-300">

                {email}

            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8"
            >

                <label className="mb-3 block text-sm text-slate-300">

                    Verification Code

                </label>

                <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 6-digit OTP"
                    className={`w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-xl text-white outline-none transition focus:border-cyan-400 ${otp ? "tracking-[0.5em]" : "tracking-normal"
                        }`}
                />
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: .97 } : {}}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,.35)] disabled:cursor-not-allowed disabled:opacity-70"
                >

                    {loading ? (
                        <>
                            <LoaderCircle
                                className="animate-spin"
                                size={20}
                            />

                            Verifying...

                        </>
                    ) : (
                        <>
                            Verify Email
                        </>
                    )}

                </motion.button>

            </form>

            <button
                onClick={handleResendOtp}
                className="mt-6 w-full text-center text-sm text-cyan-300 transition hover:text-cyan-200"
            >

                Resend OTP

            </button>

        </motion.div>

    );

};

export default VerifyEmailForm;
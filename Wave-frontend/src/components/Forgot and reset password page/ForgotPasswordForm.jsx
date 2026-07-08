import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import OtpInput from "./OtpInput";

const ForgotPasswordForm = () => {

    const [step, setStep] = useState(1);

    return (

        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl"
        >

            <h1 className="text-3xl font-bold text-white">

                Forgot Password

            </h1>

            <p className="mt-3 text-slate-400">

                {step === 1
                    ? "We'll send a verification code to your email."
                    : "Verify your OTP and create a new password."}

            </p>

            {step === 1 && (

                <div className="mt-8">

                    <label className="mb-2 block text-sm text-slate-300">

                        Email

                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">

                        <Mail className="text-cyan-300" size={18} />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent text-white outline-none"
                        />

                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: .98 }}
                        onClick={() => setStep(2)}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 py-3 font-semibold text-white"
                    >

                        Send OTP

                        <ArrowRight size={18} />

                    </motion.button>

                </div>

            )}

            {step === 2 && (

                <div className="mt-8 space-y-5">

                    <OtpInput />

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            New Password

                        </label>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">

                            <Lock className="text-cyan-300" size={18} />

                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full bg-transparent text-white outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Confirm Password

                        </label>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">

                            <Lock className="text-cyan-300" size={18} />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full bg-transparent text-white outline-none"
                            />

                        </div>

                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: .98 }}
                        className="flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 py-3 font-semibold text-white"
                    >

                        Reset Password

                    </motion.button>

                </div>

            )}

        </motion.div>

    );

};

export default ForgotPasswordForm;
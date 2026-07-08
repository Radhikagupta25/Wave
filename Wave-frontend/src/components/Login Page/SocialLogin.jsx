import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ onGoogleLogin }) => {
    return (
        <div className="mt-6">

            <div className="relative mb-6">

                <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-white/10"></div>

                </div>

                <div className="relative flex justify-center">

                    <span className="bg-[#08131F] px-4 text-sm text-slate-400">
                        or continue with
                    </span>

                </div>

            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: .97 }}
                onClick={onGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white backdrop-blur-xl transition hover:border-cyan-400 hover:bg-white/10"
            >

                <FcGoogle size={22} />

                Continue with Google

            </motion.button>

        </div>
    );
};

export default SocialLogin;
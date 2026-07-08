import ForgotPasswordForm from "../components/Forgot and reset password page/ForgotPasswordForm";
import BackgroundBlobs from "../components/Landing Page/Hero section/BackgroundBlobs";
import BubbleParticles from "../components/Landing Page/Hero section/BubbleParticles";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotAndResetPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#030712] px-4">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, x: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl transition hover:border-cyan-400 hover:bg-white/10"
      >

        <ArrowLeft size={18} />

        <span className="hidden sm:inline">
          Back
        </span>

      </motion.button>
      <BackgroundBlobs />

      <BubbleParticles />

      <ForgotPasswordForm />

    </section>
  );
};

export default ForgotAndResetPasswordPage;
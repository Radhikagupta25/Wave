import { motion } from "framer-motion";
import { Waves, MessageCircleMore } from "lucide-react";
import BackgroundBlobs from "../components/Landing Page/Hero section/BackgroundBlobs";
import BubbleParticles from "../components/Landing Page/Hero section/BubbleParticles";
import LoginForm from "../components/Login Page/LoginForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 py-6 sm:px-6 lg:px-8">
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center lg:justify-between">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="hidden w-full max-w-xl lg:block"
        >

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600 shadow-[0_10px_40px_rgba(34,211,238,.35)]">

              <Waves className="text-white" size={32} />

            </div>

            <div>

              <h1 className="text-4xl font-black text-white">
                Wave
              </h1>

              <p className="mt-2 text-slate-400">
                Where Conversations Flow.
              </p>

            </div>

          </div>

          <h2 className="max-w-lg text-5xl font-black leading-tight text-white">

            Welcome
            <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Back.
            </span>

          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-300">

            Continue your conversations, collaborate with friends,
            and stay connected through a beautifully crafted
            real-time messaging experience.

          </p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="mt-8 w-75 rounded-4xlborder border-white/10 bg-white/5 p-5 backdrop-blur-3xl shadow-[0_20px_60px_rgba(34,211,238,.15)]"
          >

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">

              <div className="relative">

                <img
                  src="https://i.pravatar.cc/100?img=32"
                  alt=""
                  className="h-11 w-11 rounded-full"
                />

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#08131F] bg-green-400" />

              </div>

              <div>

                <h3 className="font-semibold text-white">
                  User
                </h3>

                <p className="text-xs text-cyan-300">
                  Online
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              <div className="flex">

                <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2 text-sm text-white">

                  Welcome back

                </div>

              </div>

              <div className="flex justify-end">

                <div className="rounded-2xl rounded-br-sm bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm text-white">

                  Ready to chat?

                </div>

              </div>

              <div className="flex items-center gap-2 text-cyan-300">

                <MessageCircleMore size={18} />

                <span className="text-sm">

                  3 new conversations waiting

                </span>

              </div>

            </div>

          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="flex w-full justify-center lg:justify-end"
        >

          <LoginForm />

        </motion.div>

      </div>

    </section>
  );
};

export default LoginPage;
import { motion } from "framer-motion";
import { Waves, UserPlus } from "lucide-react";
import BackgroundBlobs from "../components/Landing Page/Hero section/BackgroundBlobs";
import BubbleParticles from "../components/Landing Page/Hero section/BubbleParticles";
import SignupForm from "../components/Signup page/SignupForm";

const SignupPage = () => {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 py-6 sm:px-6 lg:px-8">

      <BackgroundBlobs />

      <BubbleParticles />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center justify-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden w-full max-w-xl lg:block"
        >

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600 shadow-[0_10px_40px_rgba(34,211,238,.35)]">

              <Waves className="text-white" size={32} />

            </div>

            <div>

              <h1 className="text-5xl font-black text-white">
                Wave
              </h1>

              <p className="mt-2 text-slate-400">
                Where Conversations Flow.
              </p>

            </div>

          </div>

          <h2 className="max-w-lg text-4xl font-black leading-tight text-white">

            Join the

            <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Wave.
            </span>

          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-300">

            Create your account and experience real-time messaging,
            seamless collaboration and meaningful conversations,
            all in one beautifully crafted platform.

          </p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="mt-8 w-75 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-3xl shadow-[0_20px_60px_rgba(34,211,238,.15)]"
          >

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-blue-600">

                <UserPlus className="text-white" size={22} />

              </div>

              <div>

                <h3 className="font-semibold text-white">
                  Welcome to Wave
                </h3>

                <p className="text-xs text-cyan-300">
                  Your journey starts here
                </p>

              </div>

            </div>

            <div className="mt-5 space-y-3">

              <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">
                Create your profile
              </div>

              <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">
                Connect with friends
              </div>

              <div className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm text-white">
                Start your first conversation
              </div>

            </div>

          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full justify-center lg:justify-end"
        >

          <SignupForm />

        </motion.div>

      </div>

    </section>
  );
};

export default SignupPage;
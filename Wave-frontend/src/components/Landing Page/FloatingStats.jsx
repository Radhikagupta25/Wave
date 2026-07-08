import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap } from "lucide-react";

const stats = [
  {
    icon: <Users size={22} />,
    title: "2.5K+",
    subtitle: "Users Online",
    position: "top-12 -left-12 lg:-left-20",
    delay: 0,
  },
  {
    icon: <Zap size={22} />,
    title: "0.1s",
    subtitle: "Latency",
    position: "bottom-24 -left-6 lg:-left-16",
    delay: .3,
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "100%",
    subtitle: "Encrypted",
    position: "top-40 -right-8 lg:-right-20",
    delay: .6,
  },
];

const FloatingStats = () => {
  return (
    <>
      {stats.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: .8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            delay: card.delay,
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${card.position} hidden lg:flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,.15)]`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white">
            {card.icon}
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              {card.title}
            </h2>

            <p className="text-sm text-slate-400">
              {card.subtitle}
            </p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default FloatingStats;
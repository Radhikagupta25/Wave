import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CursorTrail = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const move = (e) => {
      const point = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setPoints((prev) => [...prev.slice(-12), point]);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-9999">

      <AnimatePresence>

        {points.map((point) => (

          <motion.div
            key={point.id}
            initial={{
              opacity: .7,
              scale: 1,
              x: point.x,
              y: point.y,
            }}
            animate={{
              opacity: 0,
              scale: .2,
              y: point.y - 25,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: .7,
              ease: "easeOut",
            }}
            className="absolute h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]"
          />

        ))}

      </AnimatePresence>

    </div>
  );
};

export default CursorTrail;
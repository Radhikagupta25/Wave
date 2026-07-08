import { motion } from "framer-motion";

const blobs = [
  {
    size: "w-96 h-96",
    color: "bg-cyan-500/20",
    top: "-top-20",
    left: "-left-24",
    duration: 14,
  },
  {
    size: "w-[30rem] h-[30rem]",
    color: "bg-blue-500/20",
    top: "top-40",
    left: "right-0",
    duration: 18,
  },
  {
    size: "w-80 h-80",
    color: "bg-sky-400/15",
    top: "bottom-0",
    left: "left-1/2",
    duration: 20,
  },
];

const BackgroundBlobs = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0f172a,transparent_40%),radial-gradient(circle_at_bottom_right,#082f49,transparent_40%),#030712]" />
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${blob.top} ${blob.left} ${blob.size} ${blob.color} rounded-full blur-[120px]`}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size:[80px_80px]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
    </>
  );
};

export default BackgroundBlobs;
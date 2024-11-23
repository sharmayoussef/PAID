import { motion } from 'framer-motion';

export const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#0f2444] to-[#1a365d]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid transparent",
              borderTopColor: `rgba(${i * 40 + 100}, ${i * 40 + 150}, 255, 0.8)`,
              borderRadius: "50%",
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
import { motion } from 'framer-motion';

export const AnimatedLogo = () => {
  return (
    <motion.div
      className="relative mb-2"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: -15 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="relative w-56 mx-auto">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-xl bg-white/20 rounded-full" />
        
        {/* Logo container with hover effects */}
        <motion.div
          className="relative"
          whileHover={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main logo */}
          <motion.img
            src="https://i.imgur.com/QumHDPv.png"
            alt="YS Logo"
            className="w-full h-auto relative z-10"
            animate={{
              rotateY: [0, 10, 0],
              rotateX: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 border-2 border-white/30 rounded-lg"
            animate={{
              scale: [0.71, 0.62, 0.61],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>
    </motion.div>
  );
};
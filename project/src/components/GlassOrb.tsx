import { motion } from 'framer-motion';

interface GlassOrbProps {
  className?: string;
  delay?: number;
  duration?: number;
  size?: string;
}

export const GlassOrb = ({ className = '', delay = 0, duration = 20, size = "200px" }: GlassOrbProps) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.2, 0.4, 0.2],
        y: [0, -20, 0],
        x: [0, 10, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        borderRadius: "50%",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)"
      }}
    />
  );
};
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassContainerProps {
  children: ReactNode;
}

export const GlassContainer = ({ children }: GlassContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 2, y: 20, rotateX: -15 }}
      animate={{ opacity: 10, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9 }}
      className="relative px-8 py-8 rounded-3xl overflow-hidden transform-gpu"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: `
          0 8px 32px 0 rgba(31, 38, 135, 0.3),
          inset 0 0 32px 0 rgba(31, 38, 135, 0.1),
          0 0 0 1px rgba(255,255,255,0.1)
        `,
        transform: "perspective(1000px) rotateX(5deg)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
      {children}
    </motion.div>
  );
};
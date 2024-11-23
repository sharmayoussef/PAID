import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 60 + 20,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
            backdropFilter: "blur(4px)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
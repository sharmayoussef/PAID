import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  isDownloading: boolean;
  disabled?: boolean;
}

export const DownloadButton = ({ onClick, isDownloading, disabled }: DownloadButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative group px-8 py-3 bg-transparent rounded-full ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Button background with gradient border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      {/* Border gradient */}
      <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 group-hover:opacity-50 transition-opacity duration-300" style={{ zIndex: -1 }} />
      
      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2">
        <motion.div
          animate={isDownloading ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isDownloading ? Infinity : 0, ease: "linear" }}
        >
          <Download className="w-5 h-5 text-blue-300" />
        </motion.div>
        <span className="text-white font-medium">
          {isDownloading ? 'Downloading...' : 'Download now'}
        </span>
      </div>
    </motion.button>
  );
};
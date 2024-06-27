import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = "w-10 h-10", width = 40, height = 40 }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <Image src="/logo.png" alt="DocViz Logo" width={width} height={height} />
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ borderWidth: 0, borderColor: 'rgba(59, 130, 246, 0)' }}
        animate={{ borderWidth: 2, borderColor: 'rgba(59, 130, 246, 0.5)' }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      >
        <motion.div 
          className="w-[1px] h-[50%] bg-gray-300 absolute top-0 left-1/2 transform -translate-x-1/2 origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;
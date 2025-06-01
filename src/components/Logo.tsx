'use client'

import { motion } from 'framer-motion';

export default function Logo({ css }) {
  return (
    <motion.div 
      className="flex items-center flex-shrink-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="relative">
        {/* Logo Text */}
        <h1 
          className="text-2xl font-bold tracking-tight"
          style={{ color: css('primary') }}
        >
          Our Portfolio
        </h1>
        
        {/* Animated accent dot */}
        <motion.div
          className="absolute -top-1 -right-2 w-2 h-2 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ backgroundColor: css('accent') }}
        />
      </div>
    </motion.div>
  );
}
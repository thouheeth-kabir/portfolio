'use client'

import { motion } from 'framer-motion';

interface NavigationBackgroundProps {
  isScrolled: boolean;
  cssAlpha: (color: string, alpha: number) => string;
}

export default function NavigationBackground({ isScrolled, cssAlpha }: NavigationBackgroundProps) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        backgroundColor: isScrolled 
          ? cssAlpha('background', 0.8) 
          : cssAlpha('background', 0.4),
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
        borderBottom: isScrolled 
          ? `1px solid ${cssAlpha('border', 0.2)}` 
          : `1px solid ${cssAlpha('border', 0.1)}`
      }}
      transition={{ duration: 0.3 }}
    />
  );
}
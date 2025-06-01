'use client'

import { motion } from 'framer-motion';

export default function MobileMenuButton({ 
  mobileMenuOpen, 
  toggleMobileMenu, 
  css, 
  cssAlpha 
}) {
  return (
    <motion.button
      className="lg:hidden relative w-10 h-10 rounded-full flex items-center justify-center"
      onClick={toggleMobileMenu}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        backgroundColor: cssAlpha('muted', 0.4),
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Hamburger Lines */}
      <div className="w-5 h-4 relative flex flex-col justify-between">
        <motion.span
          className="w-full h-0.5 rounded-full"
          style={{ backgroundColor: css('foreground') }}
          animate={{
            rotate: mobileMenuOpen ? 45 : 0,
            y: mobileMenuOpen ? 6 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-full h-0.5 rounded-full"
          style={{ backgroundColor: css('foreground') }}
          animate={{
            opacity: mobileMenuOpen ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-full h-0.5 rounded-full"
          style={{ backgroundColor: css('foreground') }}
          animate={{
            rotate: mobileMenuOpen ? -45 : 0,
            y: mobileMenuOpen ? -6 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  );
}   
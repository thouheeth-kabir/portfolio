'use client'

import { motion } from 'framer-motion';

export default function ActionButtons({ css, cssAlpha, onThemeToggle, scrollToSection }) {
  return (
    <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
      {/* Theme Toggle */}
      <motion.button
        onClick={onThemeToggle}
        className="relative w-10 h-10 rounded-full flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ 
          backgroundColor: cssAlpha('muted', 0.4),
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.div
          className="w-5 h-5"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ color: css('foreground') }}
          >
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </motion.div>
      </motion.button>
      
      {/* CTA Button */}
      <motion.button
      onClick={() => scrollToSection('projects')}
        className="relative px-6 py-2.5 rounded-full font-medium text-sm overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          background: `linear-gradient(135deg, ${css('primary')}, ${css('accent')})`,
          color: css('primary-foreground'),
          boxShadow: `0 4px 15px ${cssAlpha('primary', 0.3)}`
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          animate={{
            background: [
              `linear-gradient(135deg, ${css('primary')}, ${css('accent')})`,
              `linear-gradient(225deg, ${css('accent')}, ${css('primary')})`,
              `linear-gradient(135deg, ${css('primary')}, ${css('accent')})`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <span 
 className="relative z-10 flex items-center space-x-2">
          <span>Get Started</span>
          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </span>
      </motion.button>
    </div>
  );
}
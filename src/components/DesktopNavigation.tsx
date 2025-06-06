'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface DesktopNavigationProps {
  sections: Section[];
  activeSection: string | null;
  css: (value: string) => string;
  cssAlpha: (value: string, alpha: number) => string;
  scrollToSection: (id: string) => void;
}

export default function DesktopNavigation({ 
  sections, 
  activeSection, 
  css, 
  cssAlpha, 
  scrollToSection 
}: DesktopNavigationProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
      <div className="flex items-center space-x-1 bg-opacity-50 rounded-full p-1"
           style={{ backgroundColor: cssAlpha('muted', 0.3) }}>
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            style={{
              color: activeSection === section.id 
                ? css('primary-foreground') 
                : hoveredSection === section.id 
                  ? css('primary')
                  : css('foreground')
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {/* Active/Hover Background */}
            <AnimatePresence>
              {(activeSection === section.id || hoveredSection === section.id) && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  layoutId="navHighlight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{
                    backgroundColor: activeSection === section.id 
                      ? css('primary')
                      : cssAlpha('primary', 0.1),
                    boxShadow: activeSection === section.id 
                      ? `0 4px 12px ${cssAlpha('primary', 0.3)}`
                      : 'none'
                  }}
                />
              )}
            </AnimatePresence>
            
            {/* Link Text */}
            <span className="relative z-10">{section.label}</span>
            
            {/* Active indicator dot */}
            {activeSection === section.id && (
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ backgroundColor: css('primary-foreground') }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
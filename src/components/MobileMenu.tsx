'use client'

import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({ 
  mobileMenuOpen, 
  toggleMobileMenu, 
  sections, 
  activeSection, 
  scrollToSection, 
  css, 
  cssAlpha 
}) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `linear-gradient(135deg, ${cssAlpha('background', 0.95)}, ${cssAlpha('primary-dark', 0.9)})`,
              backdropFilter: 'blur(20px)'
            }}
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Content */}
          <motion.div
            className="relative flex flex-col h-full pt-20 pb-8"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block text-left group"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span 
                        className="text-sm font-mono opacity-50"
                        style={{ color: css('muted-foreground') }}
                      >
                        0{index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 
                          className="text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300"
                          style={{ 
                            color: activeSection === section.id 
                              ? css('primary') 
                              : css('foreground') 
                          }}
                        >
                          {section.label}
                        </h3>
                        <motion.div
                          className="h-0.5 mt-2 rounded-full"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                          style={{ backgroundColor: css('primary') }}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <motion.div
                onClick={() => scrollToSection('projects')}
                className="mt-12 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <button
                  className="w-full py-4 px-6 rounded-2xl font-medium text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${css('primary')}, ${css('accent')})`,
                    color: css('primary-foreground')
                  }}
                >
                  Get Started
                </button>
                
                {/* <div className="flex justify-center space-x-6 pt-4">
                  {['GitHub', 'Twitter', 'LinkedIn'].map((social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{ 
                        backgroundColor: cssAlpha('muted', 0.4),
                        color: css('foreground')
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.charAt(0)}
                    </motion.a>
                  ))}
                </div> */}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
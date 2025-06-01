'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import NavigationBackground from './NavigationBackground';
import DesktopNavigation from './DesktopNavigation';
import ActionButtons from './ActionButtons';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

export default function Navigation({ 
  sections, 
  activeSection, 
  isScrolled,
  css,
  cssAlpha,
  onThemeToggle
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? '' : 'hidden';
  };
  
  // Clean up overflow style on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <>
      {/* Main Navigation Bar - Full Width */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 h-16"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background with glassmorphism effect */}
        <NavigationBackground 
          isScrolled={isScrolled} 
          cssAlpha={cssAlpha} 
        />
        
        {/* Navigation Content */}
        <div className="relative h-full w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
            
            {/* Logo Section */}
            <Logo css={css} />
            
            {/* Desktop Navigation Links */}
            <DesktopNavigation
              sections={sections}
              activeSection={activeSection}
              css={css}
              cssAlpha={cssAlpha}
              scrollToSection={scrollToSection}
            />
            
            {/* Action Buttons */}
            <ActionButtons
              css={css}
              cssAlpha={cssAlpha}
              onThemeToggle={onThemeToggle}
              scrollToSection={scrollToSection}
            />
            
            {/* Mobile Menu Button */}
            <MobileMenuButton
              mobileMenuOpen={mobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
              css={css}
              cssAlpha={cssAlpha}
            />
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu Overlay */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        css={css}
        cssAlpha={cssAlpha}
      />
    </>
  );
}
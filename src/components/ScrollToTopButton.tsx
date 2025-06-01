'use client'

import { useState, useEffect } from 'react';
import { useThemeCSS } from '@/hooks/useTheme';

/**
 * Button that appears when scrolled down and allows user to scroll back to top
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Get theme styling
  let styleProps = {};
  
  try {
    const { css, cssAlpha } = useThemeCSS();
    styleProps = {
      backgroundColor: css('primary'),
      color: css('background'),
      boxShadow: `0 4px 12px ${cssAlpha('primary', 0.3)}`
    };
  } catch (error) {
    // Fallback styling if theme context isn't available
    styleProps = {
      backgroundColor: 'rgb(14, 165, 233)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
    };
  }
  
  // Show button when scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (!isVisible) return null;
  
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full transition-all hover:scale-110"
      style={styleProps}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { useThemeComplete } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import ThemeToggler from '@/components/ThemeToggler';
import HeroSection from '@/components/sections/HeroSection';
import { CapabilitiesSection, ProjectsSection, ContactSection } from '@/components/CapabilitiesSection';
import Footer from '@/components/Footer';

export default function PortfolioPage() {
  const { 
    currentTheme,
    css, 
    cssAlpha,
    setTheme,
    nextTheme, 
    previousTheme,
    randomTheme,
    themeId,
    name: themeName,
    category: themeCategory
  } = useThemeComplete();
  
  // Enhanced state management
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for performance optimization
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafId = useRef<number>();
  
  // Enhanced scroll tracking with throttling
  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update scroll states
      setIsScrolled(scrollY > 50);
      setScrollProgress(Math.min(scrollY / docHeight, 1));
    });
  }, []);
  
  // Intersection Observer for section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-10% 0px -10% 0px'
      }
    );
    
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  // Mouse tracking for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);
  
  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Preload critical resources
  useEffect(() => {
    // Preload any critical images or fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Dynamic background with subtle gradient based on mouse position
  const dynamicBackground = {
    background: `
      radial-gradient(
        circle at ${mousePosition.x}% ${mousePosition.y}%, 
        ${cssAlpha('accent', 0.02)} 0%, 
        transparent 50%
      ),
      ${css('background')}
    `,
    transition: 'background 0.3s ease-out'
  };

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ 
          backgroundColor: css('background'),
          color: css('foreground')
        }}
      >
        <div className="relative">
          {/* Modern loading spinner */}
          <div 
            className="w-12 h-12 border-2 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: css('accent'),
              borderRightColor: cssAlpha('accent', 0.3)
            }}
          />
          <div 
            className="absolute inset-0 w-12 h-12 border-2 border-transparent rounded-full animate-ping"
            style={{
              borderTopColor: cssAlpha('accent', 0.1)
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(90deg, ${css('accent')}, ${css('primary')})`
        }}
      />
      
      <div 
        className="min-h-screen relative overflow-hidden"
        style={dynamicBackground}
      >
        {/* Ambient background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 -right-48 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{ backgroundColor: css('accent') }}
          />
          <div 
            className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full opacity-5 blur-3xl"
            style={{ backgroundColor: css('primary') }}
          />
        </div>
        
        {/* Full-width Fixed Navigation */}
        <header 
          className="fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300"
          style={{
            backgroundColor: isScrolled ? cssAlpha('background', 0.8) : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderBottom: isScrolled ? `1px solid ${cssAlpha('border', 0.1)}` : 'none',
            boxShadow: isScrolled ? `0 4px 6px -1px ${cssAlpha('shadow', 0.1)}` : 'none'
          }}
        >
          <div className="w-fully-2 py-2 h-16 px-4 md:px-6 lg:px-8 flex items-center justify-between">
           
            
              <Navigation 
                sections={sections}
                activeSection={activeSection}
                isScrolled={isScrolled}
                css={css}
                cssAlpha={cssAlpha}
              />
            
            
            
          </div>
        </header>
                
        {/* Enhanced Theme Toggler with better positioning */}
        <div className="fixed bottom-6 right-6 z-50 group">
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
            style={{ backgroundColor: cssAlpha('accent', 0.2) }}
          />
          <ThemeToggler 
            currentTheme={currentTheme}
            themeName={themeName}
            themeCategory={themeCategory}
            nextTheme={nextTheme}
            previousTheme={previousTheme}
            randomTheme={randomTheme}
            css={css}
            cssAlpha={cssAlpha}
          />
        </div>
        
        {/* Main Content with enhanced spacing and transitions */}
        <main className="relative">
          {/* Hero Section */}
          <section 
            id="hero" 
            className="min-h-screen flex items-center justify-center relative"
            style={{
              paddingTop: 'max(4rem, env(safe-area-inset-top))',
              paddingBottom: 'env(safe-area-inset-bottom)'
            }}
          >
            <HeroSection 
              css={css} 
              cssAlpha={cssAlpha} 
            />
          </section>
          
          {/* Capabilities Section */}
          <section 
            id="capabilities" 
            className="relative py-20 lg:py-32"
          >
            <div className="container mx-auto">
              <CapabilitiesSection 
                css={css} 
                cssAlpha={cssAlpha} 
              />
            </div>
          </section>
          
          {/* Projects Section */}
          <section 
            id="projects" 
            className="relative py-20 lg:py-32"
            style={{
              backgroundColor: cssAlpha('muted', 0.3)
            }}
          >
            <div className="container mx-auto">
              <ProjectsSection 
                css={css} 
                cssAlpha={cssAlpha} 
              />
            </div>
          </section>
          
          {/* Contact Section */}
          <section 
            id="contact" 
            className="relative py-20 lg:py-32"
          >
            <div className="container mx-auto">
              <ContactSection 
                css={css} 
                cssAlpha={cssAlpha} 
              />
            </div>
          </section>
        </main>
        
        {/* Enhanced Footer */}
        <Footer 
          css={css} 
          cssAlpha={cssAlpha}
          themeName={themeName}
          themeCategory={themeCategory}
          randomTheme={randomTheme}
        />
      </div>
      
      {/* Accessibility: Skip to content link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 rounded-md font-medium transition-colors"
        style={{
          backgroundColor: css('accent'),
          color: css('accent-foreground')
        }}
      >
        Skip to content
      </a>
    </>
  );
}
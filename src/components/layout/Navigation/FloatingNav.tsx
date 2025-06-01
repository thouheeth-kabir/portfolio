'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useThemeCSS } from '@/hooks/useTheme'
import { Menu, X, ChevronUp } from 'lucide-react'

interface NavigationSection {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
}

interface FloatingNavProps {
  sections: NavigationSection[]
  isVisible?: boolean
  activeSection?: string
  onSectionClick: (sectionId: string) => void
  showOnScroll?: boolean
  scrollThreshold?: number
  position?: 'top' | 'bottom'
  variant?: 'pill' | 'bar' | 'compact'
  showScrollToTop?: boolean
  className?: string
}

export function FloatingNav({ 
  sections, 
  isVisible = true,
  activeSection,
  onSectionClick,
  showOnScroll = true,
  scrollThreshold = 100,
  position = 'top',
  variant = 'pill',
  showScrollToTop = true,
  className 
}: FloatingNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentActiveSection, setCurrentActiveSection] = useState(activeSection || sections[0]?.id)
  const navRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const { getCSSColorProperty } = useThemeCSS()

  // Handle scroll detection
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldShow = latest > scrollThreshold
    setIsScrolled(shouldShow)
  })

  // Auto-detect active section based on scroll position
  useEffect(() => {
    if (!showOnScroll) return

    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      const scrollPosition = window.scrollY + 100 // Offset for better UX

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('data-section')

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (sectionId && sectionId !== currentActiveSection) {
            setCurrentActiveSection(sectionId)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentActiveSection, showOnScroll])

  // Handle section click with smooth scroll
  const handleSectionClick = (sectionId: string, href?: string) => {
    if (href) {
      // External link
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    // Internal section scroll
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[data-section="${sectionId}"]`)
    
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }

    setCurrentActiveSection(sectionId)
    setIsMobileMenuOpen(false)
    onSectionClick(sectionId)
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Determine visibility
  const shouldShow = showOnScroll ? isScrolled && isVisible : isVisible

  // Variant styles
  const variantStyles = {
    pill: cn(
      'rounded-full px-6 py-3',
      'bg-background/80 backdrop-blur-md border border-border/50'
    ),
    bar: cn(
      'rounded-lg px-4 py-2',
      'bg-background/90 backdrop-blur-lg border-b border-border/30'
    ),
    compact: cn(
      'rounded-md px-3 py-1.5',
      'bg-background/95 backdrop-blur-sm border border-border/40'
    )
  }

  // Position styles
  const positionStyles = {
    top: position === 'top' ? 'top-4' : 'bottom-4',
    transform: position === 'top' ? '-translate-x-1/2' : '-translate-x-1/2'
  }

  // Animation variants
  const navVariants = {
    hidden: {
      opacity: 0,
      y: position === 'top' ? -20 : 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: position === 'top' ? -20 : 20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    })
  }

  return (
    <>
      <AnimatePresence>
        {shouldShow && (
          <motion.nav
            ref={navRef}
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed left-1/2 z-50',
              positionStyles.top,
              positionStyles.transform,
              'shadow-lg shadow-black/10',
              className
            )}
            style={{
              backdropFilter: 'blur(12px)',
              background: `rgb(${getCSSColorProperty('background').replace('rgb(', '').replace(')', '')} / 0.8)`
            }}
          >
            {/* Desktop Navigation */}
            <div className={cn('hidden md:block', variantStyles[variant])}>
              <ul className="flex items-center space-x-1">
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    variants={itemVariants}
                    custom={index}
                    className="relative"
                  >
                    <button
                      onClick={() => handleSectionClick(section.id, section.href)}
                      className={cn(
                        'relative px-3 py-1.5 text-sm font-medium transition-all duration-200',
                        'hover:text-primary focus:text-primary focus:outline-none',
                        'rounded-md',
                        currentActiveSection === section.id
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {section.icon && (
                          <span className="w-4 h-4 flex-shrink-0">
                            {section.icon}
                          </span>
                        )}
                        <span>{section.label}</span>
                      </div>
                      
                      {/* Active indicator */}
                      {currentActiveSection === section.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-primary/10 rounded-md border border-primary/20"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30
                          }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className={cn('md:hidden', variantStyles[variant])}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground"
                aria-label="Toggle navigation menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </motion.div>
                <span className="text-xs">
                  {sections.find(s => s.id === currentActiveSection)?.label || 'Menu'}
                </span>
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={cn(
                    'absolute top-full left-0 right-0 mt-2 md:hidden',
                    'bg-background/95 backdrop-blur-lg border border-border/50',
                    'rounded-lg shadow-lg shadow-black/10 p-2'
                  )}
                >
                  <ul className="space-y-1">
                    {sections.map((section, index) => (
                      <motion.li
                        key={section.id}
                        variants={itemVariants}
                        custom={index}
                      >
                        <button
                          onClick={() => handleSectionClick(section.id, section.href)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium',
                            'transition-colors rounded-md text-left',
                            currentActiveSection === section.id
                              ? 'text-primary bg-primary/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          )}
                        >
                          {section.icon && (
                            <span className="w-4 h-4 flex-shrink-0">
                              {section.icon}
                            </span>
                          )}
                          <span>{section.label}</span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      {showScrollToTop && shouldShow && (
        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={cn(
              'fixed right-4 z-50 p-2',
              position === 'top' ? 'bottom-4' : 'top-4',
              'bg-primary text-primary-foreground rounded-full shadow-lg',
              'hover:bg-primary/90 transition-colors',
              'backdrop-blur-sm'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" />
          </motion.button>
        </AnimatePresence>
      )}
    </>
  )
}

// Hook for auto-detecting scroll and active sections
export function useFloatingNav(sections: NavigationSection[], threshold = 100) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(sections[0]?.id)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > threshold)
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section.id) || 
                       document.querySelector(`[data-section="${section.id}"]`)
        
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return { isScrolled, activeSection }
}

// Export types
export type { NavigationSection, FloatingNavProps }
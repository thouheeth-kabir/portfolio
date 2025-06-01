'use client'

import { useState, useEffect, useCallback } from 'react'
import { FloatingNav } from './FloatingNav'
import { SectionIndicator } from './SectionIndicator'
import { ThemeToggle } from '@/components/ThemeToggler'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Code2, Mail, Briefcase, FileText } from 'lucide-react'

// Navigation section interface
export interface NavigationSection {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  href?: string
}

// Hook for scroll position detection
function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      
      setScrollY(currentScrollY)
      setScrollDirection(direction)
      setIsScrolled(currentScrollY > 50)
      
      lastScrollY = currentScrollY
    }

    const throttledUpdateScrollPosition = throttle(updateScrollPosition, 16) // ~60fps

    window.addEventListener('scroll', throttledUpdateScrollPosition, { passive: true })
    
    return () => window.removeEventListener('scroll', throttledUpdateScrollPosition)
  }, [])

  return { scrollY, scrollDirection, isScrolled }
}

// Throttle utility function
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Default navigation sections configuration
const defaultNavigationSections: NavigationSection[] = [
  { 
    id: 'hero', 
    label: 'Home',
    description: 'Welcome & Introduction',
    icon: <Home className="w-4 h-4" />
  },
  { 
    id: 'about', 
    label: 'About',
    description: 'Background & Skills',
    icon: <User className="w-4 h-4" />
  },
  { 
    id: 'capabilities', 
    label: 'Capabilities',
    description: 'Services & Expertise',
    icon: <Briefcase className="w-4 h-4" />
  },
  { 
    id: 'projects', 
    label: 'Projects',
    description: 'Featured Work & Case Studies',
    icon: <Code2 className="w-4 h-4" />
  },
  { 
    id: 'experience', 
    label: 'Experience',
    description: 'Work History & Achievements',
    icon: <FileText className="w-4 h-4" />
  },
  { 
    id: 'contact', 
    label: 'Contact',
    description: 'Get In Touch',
    icon: <Mail className="w-4 h-4" />
  },
]

interface NavigationProps {
  sections?: NavigationSection[]
  showFloatingNav?: boolean
  showSectionIndicator?: boolean
  showThemeToggle?: boolean
  floatingNavThreshold?: number
  sectionIndicatorPosition?: 'left' | 'right'
  sectionIndicatorVariant?: 'dots' | 'lines' | 'mixed'
  onSectionChange?: (sectionId: string) => void
  className?: string
}

export function Navigation({
  sections = defaultNavigationSections,
  showFloatingNav = true,
  showSectionIndicator = true,
  showThemeToggle = true,
  floatingNavThreshold = 100,
  sectionIndicatorPosition = 'right',
  sectionIndicatorVariant = 'dots',
  onSectionChange,
  className
}: NavigationProps) {
  const { scrollY, scrollDirection, isScrolled } = useScrollPosition()
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  const [isNavigating, setIsNavigating] = useState(false)

  // Enhanced smooth scroll with offset calculation
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[data-section="${sectionId}"]`)
    
    if (element) {
      setIsNavigating(true)
      
      // Calculate offset based on fixed headers
      const headerHeight = 80 // Adjust based on your header height
      const elementPosition = element.offsetTop - headerHeight
      
      // Smooth scroll with custom easing
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      })

      // Update active section immediately for better UX
      setActiveSection(sectionId)
      onSectionChange?.(sectionId)

      // Reset navigation state after scroll completion
      setTimeout(() => {
        setIsNavigating(false)
      }, 1000) // Adjust based on scroll duration
    }
  }, [onSectionChange])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) return

      const currentIndex = sections.findIndex(s => s.id === activeSection)
      
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          if (currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1].id)
          }
          break
          
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          if (currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1].id)
          }
          break
          
        case 'Home':
          event.preventDefault()
          scrollToSection(sections[0].id)
          break
          
        case 'End':
          event.preventDefault()
          scrollToSection(sections[sections.length - 1].id)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, sections, scrollToSection])

  // Show floating nav based on scroll position and direction
  const shouldShowFloatingNav = isScrolled && 
    (scrollY > floatingNavThreshold) && 
    (scrollDirection === 'up' || scrollY < 200)

  return (
    <div className={className}>
      {/* Floating Navigation */}
      {showFloatingNav && (
        <FloatingNav
          sections={sections}
          isVisible={shouldShowFloatingNav}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          showOnScroll={true}
          scrollThreshold={floatingNavThreshold}
          variant="pill"
          showScrollToTop={true}
        />
      )}

      {/* Section Indicator */}
      {showSectionIndicator && (
        <SectionIndicator
          sections={sections}
          onSectionClick={scrollToSection}
          position={sectionIndicatorPosition}
          variant={sectionIndicatorVariant}
          showLabels={true}
          showProgress={true}
        />
      )}

      {/* Theme Toggle - Fixed position */}
      {showThemeToggle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className={`fixed top-4 z-50 ${
            sectionIndicatorPosition === 'right' ? 'left-4' : 'right-4'
          }`}
        >
          <ThemeToggle
            variant="dropdown"
            size="md"
            showLabel={false}
            showCategory={true}
            align={sectionIndicatorPosition === 'right' ? 'left' : 'right'}
          />
        </motion.div>
      )}

      {/* Navigation Status Indicator (for development/debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-black/80 text-white text-xs rounded-lg font-mono"
        >
          <div>Active: {activeSection}</div>
          <div>Scroll: {Math.round(scrollY)}px</div>
          <div>Direction: {scrollDirection}</div>
          <div>Navigating: {isNavigating ? 'true' : 'false'}</div>
        </motion.div>
      )}
    </div>
  )
}

// Hook for external components to interact with navigation
export function useNavigation(sections: NavigationSection[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  
  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[data-section="${sectionId}"]`)
    
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      })
      
      setActiveSection(sectionId)
    }
  }, [])

  const navigateToNext = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    if (currentIndex < sections.length - 1) {
      navigateToSection(sections[currentIndex + 1].id)
    }
  }, [activeSection, sections, navigateToSection])

  const navigateToPrevious = useCallback(() => {
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    if (currentIndex > 0) {
      navigateToSection(sections[currentIndex - 1].id)
    }
  }, [activeSection, sections, navigateToSection])

  return {
    activeSection,
    setActiveSection,
    navigateToSection,
    navigateToNext,
    navigateToPrevious,
    sections
  }
}

// Preset navigation configurations
export const navigationPresets = {
  portfolio: defaultNavigationSections,
  
  minimal: [
    { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'work', label: 'Work', icon: <Code2 className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ],
  
  business: [
    { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Code2 className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ],
  
  agency: [
    { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'work', label: 'Our Work', icon: <Code2 className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <User className="w-4 h-4" /> },
    { id: 'process', label: 'Process', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ]
} as const

// Export components and types
export { FloatingNav, SectionIndicator, ThemeToggle }
export type { NavigationProps }
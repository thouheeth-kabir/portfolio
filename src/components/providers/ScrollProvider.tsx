'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useScrollPosition } from '@/hooks/animations/useScrollPosition'

interface ScrollContextType {
  scrollY: number
  scrollDirection: 'up' | 'down' | null
  isScrolling: boolean
  scrollToTop: () => void
  scrollToSection: (sectionId: string) => void
  activeSection: string | null
  setActiveSection: (section: string | null) => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

interface ScrollProviderProps {
  children: React.ReactNode
  smoothScrollDuration?: number
}

export function ScrollProvider({ 
  children, 
  smoothScrollDuration = 800 
}: ScrollProviderProps) {
  const { scrollY, scrollDirection, isScrolling } = useScrollPosition()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update active section after scroll completes
      setTimeout(() => {
        setActiveSection(sectionId)
      }, smoothScrollDuration / 2)
    }
  }, [smoothScrollDuration])

  // Update document class based on scroll direction
  useEffect(() => {
    document.documentElement.classList.toggle('scroll-up', scrollDirection === 'up')
    document.documentElement.classList.toggle('scroll-down', scrollDirection === 'down')
    document.documentElement.classList.toggle('scrolling', isScrolling)
  }, [scrollDirection, isScrolling])

  const contextValue: ScrollContextType = {
    scrollY,
    scrollDirection,
    isScrolling,
    scrollToTop,
    scrollToSection,
    activeSection,
    setActiveSection,
  }

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScrollContext() {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider')
  }
  return context
}

// Hook for scroll-based animations
export function useScrollAnimation(threshold = 0.1) {
  const { scrollY } = useScrollContext()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setIsVisible(scrollPercent > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY, threshold])

  return isVisible
}
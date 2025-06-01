'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useThemeCSS } from '@/hooks/useTheme'

interface NavigationSection {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface SectionIndicatorProps {
  sections: NavigationSection[]
  onSectionClick?: (sectionId: string) => void
  position?: 'left' | 'right'
  variant?: 'dots' | 'lines' | 'mixed'
  showLabels?: boolean
  showProgress?: boolean
  offset?: number
  threshold?: number
  className?: string
}

// Custom intersection observer hook for section detection
function useIntersectionObserver(
  sectionIds: string[],
  options: IntersectionObserverInit = {}
) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId) || 
                     document.querySelector(`[data-section="${sectionId}"]`)
      
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setVisibleSections(prev => {
              const newSet = new Set(prev)
              if (entry.isIntersecting) {
                newSet.add(sectionId)
              } else {
                newSet.delete(sectionId)
              }
              return newSet
            })
          },
          {
            threshold: options.threshold || 0.3,
            rootMargin: options.rootMargin || '-10% 0px -10% 0px',
            ...options
          }
        )

        observer.observe(element)
        observers.set(sectionId, observer)
      }
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [sectionIds, options.threshold, options.rootMargin])

  // Determine active section based on scroll position and visibility
  useEffect(() => {
    if (visibleSections.size === 0) return

    // Get the topmost visible section
    const scrollY = window.scrollY + 100 // Offset for better UX
    let closestSection = ''
    let closestDistance = Infinity

    Array.from(visibleSections).forEach(sectionId => {
      const element = document.getElementById(sectionId) || 
                     document.querySelector(`[data-section="${sectionId}"]`)
      
      if (element) {
        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top)
        
        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = sectionId
        }
      }
    })

    if (closestSection && closestSection !== activeSection) {
      setActiveSection(closestSection)
    }
  }, [visibleSections, activeSection])

  return { activeSection, visibleSections }
}

export function SectionIndicator({ 
  sections, 
  onSectionClick,
  position = 'right',
  variant = 'dots',
  showLabels = true,
  showProgress = false,
  offset = 24,
  threshold = 0.3,
  className 
}: SectionIndicatorProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const indicatorRef = useRef<HTMLElement>(null)
  const { getCSSColorProperty } = useThemeCSS()
  
  const { activeSection, visibleSections } = useIntersectionObserver(
    sections.map(s => s.id),
    { threshold }
  )

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    if (showProgress) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [showProgress])

  // Handle section click with smooth scroll
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[data-section="${sectionId}"]`)
    
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed headers
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }

    onSectionClick?.(sectionId)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: position === 'right' ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  const labelVariants = {
    hidden: { 
      opacity: 0, 
      x: position === 'right' ? 10 : -10,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30
      }
    }
  }

  // Position styles
  const positionStyles = {
    right: 'right-6 lg:right-8',
    left: 'left-6 lg:left-8'
  }

  // Variant styles
  const getIndicatorElement = (section: NavigationSection, index: number) => {
    const isActive = activeSection === section.id
    const isVisible = visibleSections.has(section.id)
    const isHovered = hoveredSection === section.id

    switch (variant) {
      case 'lines':
        return (
          <motion.div
            className={cn(
              'w-8 h-0.5 rounded-full transition-all duration-300',
              isActive 
                ? 'bg-primary shadow-lg shadow-primary/50' 
                : isVisible
                ? 'bg-primary/60'
                : 'bg-muted-foreground/40 hover:bg-primary/40'
            )}
            animate={{
              width: isActive ? 32 : isHovered ? 28 : 20,
              backgroundColor: isActive 
                ? getCSSColorProperty('primary-500')
                : isHovered 
                ? getCSSColorProperty('primary-400')
                : getCSSColorProperty('muted-foreground', 0.4)
            }}
          />
        )

      case 'mixed':
        return (
          <div className="flex items-center gap-2">
            <motion.div
              className={cn(
                'w-2 h-2 rounded-full border transition-all duration-300',
                isActive 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/50' 
                  : 'bg-transparent border-muted-foreground hover:border-primary'
              )}
              animate={{
                scale: isActive ? 1.2 : isHovered ? 1.1 : 1
              }}
            />
            <motion.div
              className={cn(
                'h-0.5 rounded-full transition-all duration-300',
                isActive 
                  ? 'bg-primary/60' 
                  : isVisible
                  ? 'bg-primary/30'
                  : 'bg-muted-foreground/20'
              )}
              animate={{
                width: isActive ? 16 : isVisible ? 12 : 8
              }}
            />
          </div>
        )

      default: // dots
        return (
          <motion.div
            className="relative"
          >
            <motion.div
              className={cn(
                'w-3 h-3 rounded-full border-2 transition-all duration-300',
                isActive 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/50' 
                  : isVisible
                  ? 'bg-primary/20 border-primary/60'
                  : 'bg-transparent border-muted-foreground hover:border-primary'
              )}
              animate={{
                scale: isActive ? 1.3 : isHovered ? 1.2 : 1,
                borderWidth: isActive ? 3 : 2
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Icon overlay */}
            {section.icon && isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <div className="w-2 h-2">
                  {section.icon}
                </div>
              </motion.div>
            )}
          </motion.div>
        )
    }
  }

  const activeIndex = sections.findIndex(s => s.id === activeSection)

  return (
    <motion.nav
      ref={indicatorRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-40',
        'hidden lg:block',
        positionStyles[position],
        className
      )}
      style={{ transform: `translateY(calc(-50% + ${offset}px))` }}
    >
      {/* Progress line background */}
      {showProgress && (
        <div className={cn(
          'absolute top-0 bottom-0 w-0.5 bg-muted-foreground/20 rounded-full',
          position === 'right' ? 'left-[5px]' : 'right-[5px]'
        )}>
          <motion.div
            className="w-full bg-primary/60 rounded-full origin-top"
            style={{
              scaleY: scrollProgress,
              transformOrigin: 'top'
            }}
          />
        </div>
      )}

      <ul className="relative space-y-4">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id
          const isHovered = hoveredSection === section.id
          
          return (
            <motion.li
              key={section.id}
              variants={itemVariants}
              className="relative"
            >
              <button
                onClick={() => handleSectionClick(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={cn(
                  'group relative flex items-center transition-all duration-200',
                  position === 'right' ? 'flex-row' : 'flex-row-reverse'
                )}
                aria-label={`Navigate to ${section.label} section`}
              >
                {getIndicatorElement(section, index)}
                
                {/* Label */}
                <AnimatePresence>
                  {showLabels && (isHovered || isActive) && (
                    <motion.div
                      variants={labelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={cn(
                        'absolute whitespace-nowrap pointer-events-none z-10',
                        position === 'right' 
                          ? 'right-full mr-4' 
                          : 'left-full ml-4'
                      )}
                    >
                      <div className={cn(
                        'px-3 py-2 rounded-lg shadow-lg',
                        'bg-background/95 backdrop-blur-sm border border-border/50',
                        'text-sm font-medium',
                        isActive ? 'text-primary' : 'text-foreground'
                      )}>
                        <div className="font-semibold">{section.label}</div>
                        {section.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {section.description}
                          </div>
                        )}
                        
                        {/* Arrow */}
                        <div className={cn(
                          'absolute top-1/2 -translate-y-1/2 w-2 h-2',
                          'bg-background border-r border-b border-border/50',
                          'rotate-45',
                          position === 'right' 
                            ? '-right-1' 
                            : '-left-1 rotate-[225deg]'
                        )} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          )
        })}
      </ul>

      {/* Active section connector line */}
      {variant === 'dots' && activeIndex >= 0 && (
        <motion.div
          className={cn(
            'absolute w-0.5 bg-primary/30 rounded-full pointer-events-none',
            position === 'right' ? 'left-[5px]' : 'right-[5px]'
          )}
          initial={false}
          animate={{
            top: `${activeIndex * 40 + 6}px`,
            height: '12px'
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </motion.nav>
  )
}

// Export types
export type { NavigationSection, SectionIndicatorProps }
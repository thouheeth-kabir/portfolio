'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}

export function useIsSmallScreen(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsLargeScreen(): boolean {
  return useMediaQuery('(min-width: 1280px)')
}

// Dark mode detection
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

// High contrast detection
export function usePrefersHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)')
}

// Orientation detection
export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)')
}

export function useIsPortrait(): boolean {
  return useMediaQuery('(orientation: portrait)')
}

// Custom breakpoints hook
export function useBreakpoint() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  const isSmallScreen = useIsSmallScreen()
  const isLargeScreen = useIsLargeScreen()

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    current: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  } as const
}

// Hook for checking multiple breakpoints
export function useBreakpoints(breakpoints: Record<string, string>) {
  const [matches, setMatches] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQueries = Object.entries(breakpoints).map(([key, query]) => ({
      key,
      query,
      mediaQuery: window.matchMedia(query)
    }))

    // Set initial values
    const initialMatches: Record<string, boolean> = {}
    mediaQueries.forEach(({ key, mediaQuery }) => {
      initialMatches[key] = mediaQuery.matches
    })
    setMatches(initialMatches)

    // Create event listeners
    const handlers = mediaQueries.map(({ key, mediaQuery }) => {
      const handler = (event: MediaQueryListEvent) => {
        setMatches(prev => ({
          ...prev,
          [key]: event.matches
        }))
      }
      mediaQuery.addEventListener('change', handler)
      return { mediaQuery, handler }
    })

    // Cleanup
    return () => {
      handlers.forEach(({ mediaQuery, handler }) => {
        mediaQuery.removeEventListener('change', handler)
      })
    }
  }, [breakpoints])

  return matches
}
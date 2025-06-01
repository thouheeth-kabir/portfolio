'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { 
  Theme, 
  ThemeId, 
  DEFAULT_THEME,
  getTheme,
  getNextTheme,
  getPreviousTheme,
  getRandomTheme,
  applyThemeToDOM,
  saveTheme,
  loadTheme,
  getAllThemes,
  getThemesByCategory,
  type ThemeCategory
} from './index'

interface ThemeContextValue {
  // Current state
  currentTheme: Theme
  themeId: ThemeId
  isTransitioning: boolean
  
  // Theme switching
  setTheme: (id: ThemeId) => Promise<void>
  nextTheme: () => Promise<void>
  previousTheme: () => Promise<void>
  randomTheme: () => Promise<void>
  
  // Theme queries
  getThemesByCategory: (category: ThemeCategory) => Theme[]
  getAllThemes: () => Theme[]
  
  // Utils
  preloadTheme: (id: ThemeId) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeId
  enableTransitions?: boolean
  transitionDuration?: number
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  enableTransitions = true,
  transitionDuration = 300
}: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(defaultTheme)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const currentTheme = getTheme(themeId)!

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = loadTheme()
    const initialTheme = savedTheme || defaultTheme
    
    setThemeId(initialTheme)
    applyThemeToDOM(getTheme(initialTheme)!)
    setIsInitialized(true)
  }, [defaultTheme])

  // Theme switching with smooth transitions
  const setTheme = useCallback(async (newThemeId: ThemeId): Promise<void> => {
    if (newThemeId === themeId) return
    
    const theme = getTheme(newThemeId)
    if (!theme) {
      console.warn(`Theme "${newThemeId}" not found`)
      return
    }

    if (enableTransitions) {
      setIsTransitioning(true)
      
      // Add transition class
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          '--theme-transition-duration', 
          `${transitionDuration}ms`
        )
        document.documentElement.classList.add('theme-transitioning')
      }
    }

    // Small delay to ensure transition CSS is applied
    await new Promise(resolve => setTimeout(resolve, 16))
    
    // Apply new theme
    setThemeId(newThemeId)
    applyThemeToDOM(theme)
    saveTheme(newThemeId)

    if (enableTransitions) {
      // Remove transition state after animation
      setTimeout(() => {
        setIsTransitioning(false)
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('theme-transitioning')
        }
      }, transitionDuration)
    }
  }, [themeId, enableTransitions, transitionDuration])

  const nextTheme = useCallback(async () => {
    await setTheme(getNextTheme(themeId))
  }, [themeId, setTheme])

  const previousTheme = useCallback(async () => {
    await setTheme(getPreviousTheme(themeId))
  }, [themeId, setTheme])

  const randomTheme = useCallback(async () => {
    await setTheme(getRandomTheme())
  }, [setTheme])

  // Preload theme for smooth switching
  const preloadTheme = useCallback((id: ThemeId) => {
    const theme = getTheme(id)
    if (!theme) return
    
    // You could implement theme resource preloading here
    // For now, just ensure the theme exists
    console.debug(`Preloading theme: ${theme.name}`)
  }, [])

  // Add global transition styles
  useEffect(() => {
    if (!enableTransitions || typeof document === 'undefined') return

    const styleId = 'theme-transitions'
    const existingStyle = document.getElementById(styleId)
    
    if (!existingStyle) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .theme-transitioning {
          transition: 
            background-color var(--theme-transition-duration, 300ms) ease-in-out,
            color var(--theme-transition-duration, 300ms) ease-in-out,
            border-color var(--theme-transition-duration, 300ms) ease-in-out;
        }
        
        .theme-transitioning *,
        .theme-transitioning *::before,
        .theme-transitioning *::after {
          transition: 
            background-color var(--theme-transition-duration, 300ms) ease-in-out,
            color var(--theme-transition-duration, 300ms) ease-in-out,
            border-color var(--theme-transition-duration, 300ms) ease-in-out,
            box-shadow var(--theme-transition-duration, 300ms) ease-in-out !important;
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleId)
      if (style) {
        style.remove()
      }
    }
  }, [enableTransitions])

  const contextValue: ThemeContextValue = {
    currentTheme,
    themeId,
    isTransitioning,
    setTheme,
    nextTheme,
    previousTheme,
    randomTheme,
    getThemesByCategory,
    getAllThemes,
    preloadTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use theme context
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Additional utility hooks
export function useCurrentTheme(): Theme {
  const { currentTheme } = useTheme()
  return currentTheme
}

export function useThemeColor(colorKey: keyof Theme['colors']): string {
  const { currentTheme } = useTheme()
  return currentTheme.colors[colorKey]
}

export function useThemeTransition() {
  const { isTransitioning } = useTheme()
  
  const getTransitionClass = useCallback((): string => {
    return isTransitioning ? 'theme-transitioning' : ''
  }, [isTransitioning])
  
  return { isTransitioning, getTransitionClass }
}
'use client'

import { useContext, useMemo, useCallback } from 'react'
import { ThemeContext } from '@/lib/themes/ThemeProvider'
import type { ThemeId, Theme, ThemeColors } from '@/lib/themes'

// Re-export the main useTheme hook from ThemeProvider
export { useTheme, useCurrentTheme, useThemeColor, useThemeTransition } from '@/lib/themes/ThemeProvider'

// CSS utilities hook
export function useThemeCSS() {
  const { currentTheme } = useContext(ThemeContext)!
  
  // Get CSS custom property reference
  const css = useCallback((property: keyof ThemeColors): string => {
    return `rgb(var(--color-${property}))`
  }, [])
  
  // Get CSS custom property with alpha
  const cssAlpha = useCallback((property: keyof ThemeColors, alpha: number): string => {
    const clampedAlpha = Math.max(0, Math.min(1, alpha))
    return `rgb(var(--color-${property}) / ${clampedAlpha})`
  }, [])
  
  // Get raw RGB value
  const rgb = useCallback((property: keyof ThemeColors): string => {
    return currentTheme.colors[property]
  }, [currentTheme])
  
  // Convert RGB to hex
  const hex = useCallback((property: keyof ThemeColors): string => {
    const rgbValue = currentTheme.colors[property]
    const [r, g, b] = rgbValue.split(', ').map(v => parseInt(v.trim()))
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return '#000000'
    }
    
    const toHex = (n: number) => n.toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }, [currentTheme])
  
  // Create style object with theme colors
  const createStyles = useCallback((styles: Record<string, keyof ThemeColors | string>) => {
    const processedStyles: Record<string, string> = {}
    
    Object.entries(styles).forEach(([cssProperty, value]) => {
      if (currentTheme.colors[value as keyof ThemeColors]) {
        processedStyles[cssProperty] = css(value as keyof ThemeColors)
      } else {
        processedStyles[cssProperty] = value
      }
    })
    
    return processedStyles
  }, [currentTheme, css])
  
  return {
    css,
    cssAlpha,
    rgb,
    hex,
    createStyles,
    colors: currentTheme.colors,
  }
}

// Theme control hook
export function useThemeControl() {
  const { 
    setTheme, 
    nextTheme, 
    previousTheme, 
    randomTheme,
    themeId,
    getAllThemes,
    getThemesByCategory
  } = useContext(ThemeContext)!
  
  const allThemes = useMemo(() => getAllThemes(), [getAllThemes])
  const themeIds = useMemo(() => allThemes.map(t => t.id), [allThemes])
  
  const currentIndex = useMemo(() => {
    return themeIds.indexOf(themeId)
  }, [themeIds, themeId])
  
  const canGoNext = useMemo(() => currentIndex < themeIds.length - 1, [currentIndex, themeIds.length])
  const canGoPrevious = useMemo(() => currentIndex > 0, [currentIndex])
  
  const setThemeByIndex = useCallback((index: number) => {
    const themeId = themeIds[index]
    if (themeId) {
      setTheme(themeId)
    }
  }, [themeIds, setTheme])
  
  return {
    setTheme,
    nextTheme,
    previousTheme,
    randomTheme,
    setThemeByIndex,
    currentIndex,
    canGoNext,
    canGoPrevious,
    themeIds,
    allThemes,
    getThemesByCategory,
  }
}

// Theme info hook
export function useThemeInfo() {
  const { currentTheme, themeId, getAllThemes, getThemesByCategory } = useContext(ThemeContext)!
  
  const allThemes = useMemo(() => getAllThemes(), [getAllThemes])
  
  const themesInCategory = useMemo(() => {
    return getThemesByCategory(currentTheme.category)
  }, [currentTheme.category, getThemesByCategory])
  
  const stats = useMemo(() => {
    const categories = new Set(allThemes.map(t => t.category))
    return {
      totalThemes: allThemes.length,
      categories: Array.from(categories),
      categoryCount: categories.size,
      themesPerCategory: Object.fromEntries(
        Array.from(categories).map(cat => [
          cat, 
          allThemes.filter(t => t.category === cat).length
        ])
      )
    }
  }, [allThemes])
  
  return {
    theme: currentTheme,
    themeId,
    name: currentTheme.name,
    category: currentTheme.category,
    allThemes,
    themesInCategory,
    stats,
  }
}

// Combined hook for convenience
export function useThemeComplete() {
  const main = useContext(ThemeContext)!
  const css = useThemeCSS()
  const control = useThemeControl()
  const info = useThemeInfo()
  
  return {
    ...main,
    ...css,
    ...control,
    ...info,
  }
}

// Utility to check if color exists
export function useThemeColorExists() {
  const { currentTheme } = useContext(ThemeContext)!
  
  return useCallback((colorKey: string): boolean => {
    return colorKey in currentTheme.colors
  }, [currentTheme])
}

// Type exports
export type { ThemeId, Theme, ThemeColors }
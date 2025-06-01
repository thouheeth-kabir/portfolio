// Simplified and robust theme system
export interface ThemeColors {
  // Core color scales (only what you actually need)
  primary: string
  'primary-light': string
  'primary-dark': string
  
  secondary: string
  'secondary-light': string
  'secondary-dark': string
  
  accent: string
  'accent-light': string
  'accent-dark': string
  
  // Base colors
  background: string
  foreground: string
  muted: string
  'muted-foreground': string
  border: string
  
  // Semantic colors
  success: string
  warning: string
  error: string
  info: string
}

export interface Theme {
  id: string
  name: string
  category: 'cyberpunk' | 'nature' | 'cosmic' | 'retro' | 'minimal' | 'luxury'
  colors: ThemeColors
}

// Simplified theme definitions - only essential colors
export const themes: Record<string, Theme> = {
  'neon-tokyo': {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    category: 'cyberpunk',
    colors: {
      primary: '14, 165, 233',        // Electric Blue
      'primary-light': '56, 189, 248',
      'primary-dark': '3, 105, 161',
      
      secondary: '196, 80, 231',      // Neon Purple
      'secondary-light': '220, 115, 247',
      'secondary-dark': '139, 34, 158',
      
      accent: '236, 72, 153',         // Hot Pink
      'accent-light': '248, 113, 113',
      'accent-dark': '190, 24, 93',
      
      background: '15, 23, 42',       // Dark Slate
      foreground: '248, 250, 252',    // Light Gray
      muted: '30, 41, 59',
      'muted-foreground': '148, 163, 184',
      border: '51, 65, 85',
      
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '239, 68, 68',
      info: '14, 165, 233',
    }
  },

  'blade-runner': {
    id: 'blade-runner',
    name: 'Blade Runner',
    category: 'cyberpunk',
    colors: {
      primary: '245, 158, 11',        // Amber
      'primary-light': '251, 191, 36',
      'primary-dark': '180, 83, 9',
      
      secondary: '239, 68, 68',       // Red
      'secondary-light': '248, 113, 113',
      'secondary-dark': '185, 28, 28',
      
      accent: '6, 182, 212',          // Cyan
      'accent-light': '34, 211, 238',
      'accent-dark': '14, 116, 144',
      
      background: '10, 10, 10',
      foreground: '255, 215, 0',
      muted: '26, 15, 10',
      'muted-foreground': '161, 161, 170',
      border: '69, 26, 3',
      
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '239, 68, 68',
      info: '6, 182, 212',
    }
  },

  'forest-spirits': {
    id: 'forest-spirits',
    name: 'Forest Spirits',
    category: 'nature',
    colors: {
      primary: '34, 197, 94',         // Forest Green
      'primary-light': '74, 222, 128',
      'primary-dark': '21, 128, 61',
      
      secondary: '139, 69, 19',       // Earth Brown
      'secondary-light': '251, 146, 60',
      'secondary-dark': '101, 44, 13',
      
      accent: '132, 204, 22',         // Lime Green
      'accent-light': '163, 230, 53',
      'accent-dark': '77, 124, 15',
      
      background: '28, 44, 28',
      foreground: '240, 253, 244',
      muted: '47, 79, 47',
      'muted-foreground': '156, 163, 175',
      border: '72, 99, 72',
      
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '220, 38, 38',
      info: '34, 197, 94',
    }
  },

  'starlight-cosmos': {
    id: 'starlight-cosmos',
    name: 'Starlight Cosmos',
    category: 'cosmic',
    colors: {
      primary: '67, 79, 144',         // Deep Space Blue
      'primary-light': '98, 113, 179',
      'primary-dark': '41, 48, 89',
      
      secondary: '135, 34, 178',      // Nebula Purple
      'secondary-light': '168, 79, 210',
      'secondary-dark': '88, 22, 117',
      
      accent: '245, 224, 117',        // Star Gold
      'accent-light': '250, 241, 185',
      'accent-dark': '161, 147, 77',
      
      background: '10, 12, 25',
      foreground: '245, 245, 250',
      muted: '38, 42, 63',
      'muted-foreground': '156, 163, 175',
      border: '56, 61, 89',
      
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '220, 38, 38',
      info: '135, 34, 178',
    }
  },

  'vintage-paper': {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    category: 'retro',
    colors: {
      primary: '234, 159, 18',        // Mustard
      'primary-light': '249, 203, 99',
      'primary-dark': '167, 112, 13',
      
      secondary: '228, 72, 20',       // Burnt Orange
      'secondary-light': '251, 159, 129',
      'secondary-dark': '156, 49, 13',
      
      accent: '20, 137, 103',         // Vintage Teal
      'accent-light': '60, 174, 140',
      'accent-dark': '14, 88, 66',
      
      background: '250, 241, 222',
      foreground: '45, 33, 21',
      muted: '232, 219, 201',
      'muted-foreground': '126, 104, 86',
      border: '196, 174, 146',
      
      success: '20, 137, 103',
      warning: '234, 159, 18',
      error: '220, 38, 38',
      info: '20, 137, 103',
    }
  },

  'pure-minimal': {
    id: 'pure-minimal',
    name: 'Pure Minimal',
    category: 'minimal',
    colors: {
      primary: '70, 70, 70',          // Dark Gray
      'primary-light': '110, 110, 110',
      'primary-dark': '30, 30, 30',
      
      secondary: '170, 170, 170',     // Light Gray
      'secondary-light': '210, 210, 210',
      'secondary-dark': '140, 140, 140',
      
      accent: '20, 20, 20',           // Near Black
      'accent-light': '50, 50, 50',
      'accent-dark': '10, 10, 10',
      
      background: '255, 255, 255',
      foreground: '33, 33, 33',
      muted: '245, 245, 245',
      'muted-foreground': '156, 156, 156',
      border: '230, 230, 230',
      
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '239, 68, 68',
      info: '70, 70, 70',
    }
  },

  'golden-luxury': {
    id: 'golden-luxury',
    name: 'Golden Luxury',
    category: 'luxury',
    colors: {
      primary: '234, 179, 0',         // Royal Gold
      'primary-light': '246, 194, 85',
      'primary-dark': '158, 121, 0',
      
      secondary: '48, 48, 48',        // Charcoal
      'secondary-light': '81, 81, 81',
      'secondary-dark': '20, 20, 20',
      
      accent: '34, 197, 94',          // Emerald
      'accent-light': '74, 222, 128',
      'accent-dark': '21, 128, 61',
      
      background: '10, 10, 10',
      foreground: '245, 245, 245',
      muted: '38, 38, 38',
      'muted-foreground': '148, 148, 148',
      border: '64, 64, 64',
      
      success: '34, 197, 94',
      warning: '234, 179, 0',
      error: '239, 68, 68',
      info: '234, 179, 0',
    }
  }
}

// Utility functions
export type ThemeId = keyof typeof themes
export type ThemeCategory = Theme['category']

export const getTheme = (id: ThemeId): Theme | null => themes[id] || null

export const getThemesByCategory = (category: ThemeCategory): Theme[] =>
  Object.values(themes).filter(theme => theme.category === category)

export const getAllThemes = (): Theme[] => Object.values(themes)

export const getThemeIds = (): ThemeId[] => Object.keys(themes) as ThemeId[]

export const getCategories = (): ThemeCategory[] => [
  'cyberpunk', 'nature', 'cosmic', 'retro', 'minimal', 'luxury'
]

export const getRandomTheme = (): ThemeId => {
  const ids = getThemeIds()
  return ids[Math.floor(Math.random() * ids.length)]
}

export const getNextTheme = (currentId: ThemeId): ThemeId => {
  const ids = getThemeIds()
  const currentIndex = ids.indexOf(currentId)
  return ids[(currentIndex + 1) % ids.length]
}

export const getPreviousTheme = (currentId: ThemeId): ThemeId => {
  const ids = getThemeIds()
  const currentIndex = ids.indexOf(currentId)
  return ids[currentIndex === 0 ? ids.length - 1 : currentIndex - 1]
}

// CSS custom property utilities
export const applyThemeToDOM = (theme: Theme): void => {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  
  // Set theme identifier
  root.setAttribute('data-theme', theme.id)
  root.setAttribute('data-category', theme.category)
}

// Storage utilities
const STORAGE_KEY = 'portfolio-theme'

export const saveTheme = (themeId: ThemeId): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, themeId)
  } catch (error) {
    console.warn('Failed to save theme:', error)
  }
}

export const loadTheme = (): ThemeId | null => {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId
    return saved && themes[saved] ? saved : null
  } catch (error) {
    console.warn('Failed to load theme:', error)
    return null
  }
}

export const clearTheme = (): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear theme:', error)
  }
}

// Default theme
export const DEFAULT_THEME: ThemeId = 'pure-minimal'
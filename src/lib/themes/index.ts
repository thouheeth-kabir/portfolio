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

// Simplified theme definitions with improved color values
export const themes: Record<string, Theme> = {
  'neon-tokyo': {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    category: 'cyberpunk',
    colors: {
      primary: '20, 184, 235',        // Electric Blue
      'primary-light': '65, 205, 248',
      'primary-dark': '12, 120, 168',
      
      secondary: '196, 80, 231',      // Neon Purple
      'secondary-light': '220, 115, 247',
      'secondary-dark': '139, 34, 158',
      
      accent: '236, 72, 153',         // Hot Pink
      'accent-light': '248, 113, 183',
      'accent-dark': '190, 24, 93',
      
      background: '15, 23, 42',       // Dark Slate
      foreground: '248, 250, 252',    // Light Gray
      muted: '30, 41, 59',
      'muted-foreground': '148, 163, 184',
      border: '51, 65, 85',
      
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '239, 68, 68',
      info: '20, 184, 235',
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
      
      background: '18, 18, 23',       // Dark Background
      foreground: '245, 232, 158',    // Soft Gold
      muted: '32, 32, 40',
      'muted-foreground': '170, 152, 120',
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
      primary: '42, 158, 88',         // Forest Green
      'primary-light': '74, 187, 118',
      'primary-dark': '26, 114, 62',
      
      secondary: '139, 69, 19',       // Earth Brown
      'secondary-light': '168, 104, 59',
      'secondary-dark': '101, 44, 13',
      
      accent: '132, 204, 22',         // Lime Green
      'accent-light': '163, 230, 53',
      'accent-dark': '77, 124, 15',
      
      background: '28, 44, 28',
      foreground: '240, 253, 244',
      muted: '47, 79, 47',
      'muted-foreground': '176, 193, 175',
      border: '72, 99, 72',
      
      success: '42, 158, 88',
      warning: '212, 162, 52',
      error: '190, 58, 48',
      info: '58, 152, 185',
    }
  },

  'starlight-cosmos': {
    id: 'starlight-cosmos',
    name: 'Starlight Cosmos',
    category: 'cosmic',
    colors: {
      primary: '78, 92, 162',         // Deep Space Blue
      'primary-light': '115, 130, 205',
      'primary-dark': '50, 60, 110',
      
      secondary: '135, 34, 178',      // Nebula Purple
      'secondary-light': '168, 79, 210',
      'secondary-dark': '88, 22, 117',
      
      accent: '245, 224, 117',        // Star Gold
      'accent-light': '250, 235, 162',
      'accent-dark': '205, 184, 77',
      
      background: '10, 12, 25',
      foreground: '245, 245, 250',
      muted: '38, 42, 63',
      'muted-foreground': '156, 163, 175',
      border: '56, 61, 89',
      
      success: '75, 185, 143',
      warning: '240, 178, 85',
      error: '220, 75, 110',
      info: '78, 145, 220',
    }
  },

  'vintage-paper': {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    category: 'retro',
    colors: {
      primary: '179, 124, 87',        // Sepia Brown
      'primary-light': '204, 162, 132',
      'primary-dark': '137, 88, 59',
      
      secondary: '133, 77, 14',       // Leather Brown
      'secondary-light': '173, 105, 30',
      'secondary-dark': '92, 53, 9',
      
      accent: '24, 116, 105',         // Vintage Teal
      'accent-light': '57, 147, 136',
      'accent-dark': '16, 78, 70',
      
      background: '247, 240, 225',    // Aged Paper
      foreground: '55, 42, 27',       // Dark Ink
      muted: '235, 225, 205',         // Faded Paper
      'muted-foreground': '120, 98, 77',
      border: '210, 190, 160',
      
      success: '65, 135, 95',         // Muted Green
      warning: '204, 140, 40',        // Amber
      error: '168, 60, 50',           // Rust Red
      info: '90, 112, 145',           // Faded Blue
    }
  },

  'pure-minimal': {
    id: 'pure-minimal',
    name: 'Pure Minimal',
    category: 'minimal',
    colors: {
      primary: '45, 45, 45',          // Dark Gray
      'primary-light': '85, 85, 85',
      'primary-dark': '25, 25, 25',
      
      secondary: '170, 170, 170',     // Light Gray
      'secondary-light': '210, 210, 210',
      'secondary-dark': '140, 140, 140',
      
      accent: '0, 0, 0',              // Black
      'accent-light': '40, 40, 40',
      'accent-dark': '0, 0, 0',
      
      background: '255, 255, 255',
      foreground: '28, 28, 28',
      muted: '245, 245, 245',
      'muted-foreground': '128, 128, 128',
      border: '230, 230, 230',
      
      success: '40, 167, 94',
      warning: '224, 142, 30',
      error: '212, 45, 45',
      info: '25, 113, 194',
    }
  },

  'golden-luxury': {
    id: 'golden-luxury',
    name: 'Golden Luxury',
    category: 'luxury',
    colors: {
      primary: '212, 175, 55',        // Royal Gold
      'primary-light': '232, 198, 92',
      'primary-dark': '175, 142, 33',
      
      secondary: '40, 40, 40',        // Charcoal
      'secondary-light': '70, 70, 70',
      'secondary-dark': '20, 20, 20',
      
      accent: '16, 120, 80',          // Emerald
      'accent-light': '35, 145, 102',
      'accent-dark': '10, 90, 60',
      
      background: '20, 20, 22',
      foreground: '245, 245, 245',
      muted: '38, 38, 40',
      'muted-foreground': '158, 158, 158',
      border: '64, 64, 64',
      
      success: '34, 158, 94',
      warning: '212, 175, 55',
      error: '200, 48, 48',
      info: '55, 130, 190',
    }
  }
}

// Utility functions
export type ThemeId = keyof typeof themes
export type ThemeName = (typeof themes)[ThemeId]['name']
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
// Layout component types

export interface ContainerProps {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    className?: string
    as?: keyof JSX.IntrinsicElements
  }
  
  export interface SectionProps {
    children: React.ReactNode
    id?: string
    className?: string
    background?: 'default' | 'alternate' | 'accent'
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    as?: keyof JSX.IntrinsicElements
  }
  
  export interface GridProps {
    children: React.ReactNode
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8
    className?: string
    as?: keyof JSX.IntrinsicElements
  }
  
  export interface StackProps {
    children: React.ReactNode
    direction?: 'row' | 'column'
    spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12 | 16 | 20
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    wrap?: boolean
    className?: string
    as?: keyof JSX.IntrinsicElements
  }
  
  // Navigation types
  export interface NavigationSection {
    id: string
    label: string
    href?: string
    isExternal?: boolean
  }
  
  export interface FloatingNavProps {
    sections: NavigationSection[]
    isVisible?: boolean
    onSectionClick: (sectionId: string) => void
    className?: string
  }
  
  export interface SectionIndicatorProps {
    sections: NavigationSection[]
    onSectionClick: (sectionId: string) => void
    className?: string
  }
  
  // Responsive breakpoint types
  export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  
  export interface ResponsiveValue<T> {
    xs?: T
    sm?: T
    md?: T
    lg?: T
    xl?: T
    '2xl'?: T
  }
  
  // Layout context types
  export interface LayoutContextType {
    currentBreakpoint: Breakpoint
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    containerSize: ContainerProps['size']
    setContainerSize: (size: ContainerProps['size']) => void
  }
  
  // Scroll-related types
  export interface ScrollPosition {
    scrollY: number
    scrollX: number
    scrollDirection: 'up' | 'down' | null
    isScrolling: boolean
    scrollPercentage: number
  }
  
  export interface ScrollContextType extends ScrollPosition {
    scrollToTop: () => void
    scrollToSection: (sectionId: string) => void
    activeSection: string | null
    setActiveSection: (section: string | null) => void
  }
  
  // Viewport types
  export interface ViewportSize {
    width: number
    height: number
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
  }
  
  export interface ViewportContextType extends ViewportSize {
    isLandscape: boolean
    isPortrait: boolean
    aspectRatio: number
  }
  
  // Layout component variants
  export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
  export type SectionBackground = 'default' | 'alternate' | 'accent'
  export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
  export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12
  export type StackDirection = 'row' | 'column'
  export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
  export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  
  // Z-index types
  export type ZIndex = 
    | 'hide'
    | 'auto'
    | 'base'
    | 'docked'
    | 'dropdown'
    | 'sticky'
    | 'banner'
    | 'overlay'
    | 'modal'
    | 'popover'
    | 'skipLink'
    | 'toast'
    | 'tooltip'
  
  // Spacing types
  export type SpacingScale = 
    | 0 | 'px' | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64
    | 72 | 80 | 96
  
  export type SpacingValue = `${SpacingScale}` | SpacingScale
  
  // Media query types
  export interface MediaQueryOptions {
    minWidth?: number
    maxWidth?: number
    orientation?: 'landscape' | 'portrait'
    prefersReducedMotion?: boolean
    prefersDarkMode?: boolean
    prefersHighContrast?: boolean
  }
  
  // Layout utilities
  export interface LayoutUtilities {
    getBreakpointValue: (breakpoint: Breakpoint) => number
    getCurrentBreakpoint: () => Breakpoint
    isBreakpointActive: (breakpoint: Breakpoint) => boolean
    getResponsiveValue: <T>(value: ResponsiveValue<T>, fallback: T) => T
  }
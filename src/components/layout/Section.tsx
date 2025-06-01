'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { useThemeCSS } from '@/hooks/useTheme'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  style?: React.CSSProperties
  background?: 'default' | 'alternate' | 'accent' | 'primary' | 'secondary' | 'muted' | 'transparent'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  as?: keyof JSX.IntrinsicElements
  overlay?: boolean
  fullHeight?: boolean
  centered?: boolean
  theme?: 'light' | 'dark' | 'auto'
}

const backgroundVariants = {
  default: 'bg-background',
  alternate: 'bg-muted/30',
  accent: 'bg-accent-50/50 dark:bg-accent-950/20',
  primary: 'bg-primary-50/50 dark:bg-primary-950/20',
  secondary: 'bg-secondary-50/50 dark:bg-secondary-950/20',
  muted: 'bg-muted',
  transparent: 'bg-transparent',
} as const

const paddingVariants = {
  none: '',
  xs: 'py-4 md:py-6',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-20 lg:py-24 xl:py-28',
  xl: 'py-20 md:py-28 lg:py-32 xl:py-40',
  '2xl': 'py-24 md:py-32 lg:py-40 xl:py-48',
} as const

const themeVariants = {
  light: 'text-gray-900 [&_*]:text-gray-900',
  dark: 'text-white [&_*]:text-white',
  auto: '', // Uses default theme colors
} as const

export const Section = forwardRef<
  HTMLElement,
  SectionProps
>(({
  children,
  id,
  className,
  style,
  background = 'default',
  padding = 'lg',
  as = 'section',
  overlay = false,
  fullHeight = false,
  centered = false,
  theme = 'auto',
  ...props
}, ref) => {
  const Component = as as React.ElementType
  const { getCSSColorProperty } = useThemeCSS()

  return (
    <Component
      ref={ref}
      id={id}
      className={cn(
        // Base styles
        'relative w-full',
        
        // Full height option
        fullHeight && 'min-h-screen',
        
        // Background variants
        backgroundVariants[background],
        
        // Padding variants
        paddingVariants[padding],
        
        // Centering
        centered && 'flex items-center justify-center',
        
        // Theme variants
        themeVariants[theme],
        
        // Custom classes
        className
      )}
      style={style}
      {...props}
    >
      {/* Overlay for background images/videos */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black/50 z-0"
          style={{
            background: `linear-gradient(135deg, 
              ${getCSSColorProperty('background', 0.8)}, 
              ${getCSSColorProperty('background', 0.6)})`
          }}
        />
      )}
      
      {/* Content */}
      <div className={cn('relative z-10', centered && 'w-full')}>
        {children}
      </div>
    </Component>
  )
})

Section.displayName = 'Section'

// Specialized section variants for common use cases
export const HeroSection = forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding' | 'fullHeight' | 'centered'> & {
    padding?: SectionProps['padding']
    fullHeight?: boolean
    centered?: boolean
  }
>(({ 
  padding = 'xl', 
  fullHeight = true, 
  centered = true,
  background = 'primary',
  ...props 
}, ref) => (
  <Section
    ref={ref}
    padding={padding}
    fullHeight={fullHeight}
    centered={centered}
    background={background}
    {...props}
  />
))

HeroSection.displayName = 'HeroSection'

export const ContentSection = forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding' | 'background'> & {
    padding?: SectionProps['padding']
    background?: SectionProps['background']
  }
>(({ padding = 'lg', background = 'default', ...props }, ref) => (
  <Section ref={ref} padding={padding} background={background} {...props} />
))

ContentSection.displayName = 'ContentSection'

export const FeatureSection = forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding' | 'background'> & {
    padding?: SectionProps['padding']
    background?: SectionProps['background']
  }
>(({ padding = 'xl', background = 'alternate', ...props }, ref) => (
  <Section ref={ref} padding={padding} background={background} {...props} />
))

FeatureSection.displayName = 'FeatureSection'

export const TestimonialSection = forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding' | 'background'> & {
    padding?: SectionProps['padding']
    background?: SectionProps['background']
  }
>(({ padding = 'xl', background = 'accent', ...props }, ref) => (
  <Section ref={ref} padding={padding} background={background} {...props} />
))

TestimonialSection.displayName = 'TestimonialSection'

export const CTASection = forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding' | 'background' | 'centered'> & {
    padding?: SectionProps['padding']
    background?: SectionProps['background']
    centered?: boolean
  }
>(({ 
  padding = 'lg', 
  background = 'primary', 
  centered = true,
  ...props 
}, ref) => (
  <Section
    ref={ref}
    padding={padding}
    background={background}
    centered={centered}
    {...props}
  />
))

CTASection.displayName = 'CTASection'

export const FooterSection = forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding' | 'background' | 'as'> & {
    padding?: SectionProps['padding']
    background?: SectionProps['background']
  }
>(({ 
  padding = 'lg', 
  background = 'muted',
  ...props 
}, ref) => (
  <Section
    ref={ref}
    as="footer"
    padding={padding}
    background={background}
    {...props}
  />
))

FooterSection.displayName = 'FooterSection'

// Section with pattern background
export const PatternSection = forwardRef<
  HTMLElement,
  SectionProps & {
    pattern?: 'dots' | 'grid' | 'diagonal' | 'waves'
    patternOpacity?: number
  }
>(({ 
  pattern = 'dots', 
  patternOpacity = 0.1, 
  className,
  children,
  ...props 
}, ref) => {
  const { getCSSColorProperty } = useThemeCSS()
  
  const patterns = {
    dots: `radial-gradient(circle, ${getCSSColorProperty('foreground', patternOpacity)} 1px, transparent 1px)`,
    grid: `linear-gradient(${getCSSColorProperty('foreground', patternOpacity)} 1px, transparent 1px), 
           linear-gradient(90deg, ${getCSSColorProperty('foreground', patternOpacity)} 1px, transparent 1px)`,
    diagonal: `repeating-linear-gradient(45deg, 
                transparent, 
                transparent 10px, 
                ${getCSSColorProperty('foreground', patternOpacity)} 10px, 
                ${getCSSColorProperty('foreground', patternOpacity)} 11px)`,
    waves: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='${patternOpacity}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  }

  const patternSizes = {
    dots: 'background-size: 20px 20px',
    grid: 'background-size: 20px 20px',
    diagonal: 'background-size: 20px 20px',
    waves: 'background-size: 60px 60px',
  }

  return (
    <Section
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: patterns[pattern],
          ...Object.fromEntries([patternSizes[pattern].split(': ')]),
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Section>
  )
})

PatternSection.displayName = 'PatternSection'

// Gradient section with theme colors
export const GradientSection = forwardRef<
  HTMLElement,
  SectionProps & {
    direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
    colors?: Array<'primary' | 'secondary' | 'accent'>
  }
>(({ 
  direction = 'to-br', 
  colors = ['primary', 'secondary'],
  className,
  background = 'transparent',
  ...props 
}, ref) => {
  const { getCSSColorProperty } = useThemeCSS()
  
  const gradientColors = colors.map(color => getCSSColorProperty(`${color}-500`, 0.8)).join(', ')
  
  return (
    <Section
      ref={ref}
      background={background}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(${direction}, ${gradientColors})`,
      }}
      {...props}
    />
  )
})

GradientSection.displayName = 'GradientSection'

// Export types for external use
export type SectionBackground = SectionProps['background']
export type SectionPadding = SectionProps['padding']

// Utility function to get section spacing classes
export function getSectionSpacing(padding: SectionPadding = 'lg'): string {
  return paddingVariants[padding]
}

// Utility function to get section background classes  
export function getSectionBackground(background: SectionBackground = 'default'): string {
  return backgroundVariants[background]
}
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function for combining class names with proper Tailwind CSS conflict resolution
 * Uses clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility for creating conditional class names based on variants
 */
export function createVariantClasses<T extends Record<string, string>>(
  variants: T,
  selectedVariant: keyof T,
  baseClasses?: string
) {
  return cn(baseClasses, variants[selectedVariant])
}

/**
 * Utility for responsive class names
 */
export function responsive(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) {
  return cn(
    classes.base,
    classes.sm && `sm:${classes.sm}`,
    classes.md && `md:${classes.md}`,
    classes.lg && `lg:${classes.lg}`,
    classes.xl && `xl:${classes.xl}`,
    classes['2xl'] && `2xl:${classes['2xl']}`
  )
}

/**
 * Utility for focus ring classes
 */
export function focusRing(variant: 'default' | 'primary' | 'destructive' = 'default') {
  const variants = {
    default: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    primary: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    destructive: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2',
  }
  
  return variants[variant]
}

/**
 * Utility for animation classes
 */
export function animationClasses(
  enabled: boolean = true,
  classes: string = 'transition-all duration-200 ease-out'
) {
  return enabled ? classes : ''
}
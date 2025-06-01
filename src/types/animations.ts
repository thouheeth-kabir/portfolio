import type { Variants, Transition, MotionProps, HTMLMotionProps } from 'framer-motion'

// Animation preset types
export type AnimationPreset = 
  | 'fadeIn' 
  | 'slideUp' 
  | 'slideDown' 
  | 'slideLeft' 
  | 'slideRight' 
  | 'scaleIn' 
  | 'scaleOut'
  | 'rotateIn'
  | 'flip'
  | 'bounce'
  | 'shake'
  | 'pulse'
  | 'glow'
  | 'custom'

// Animation duration types
export type AnimationDuration = 
  | 'instant'
  | 'fastest' 
  | 'faster'
  | 'fast'
  | 'normal'
  | 'slow'
  | 'slower'
  | 'slowest'

// Animation easing types
export type AnimationEasing = 
  | 'linear'
  | 'ease'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'gentle'
  | 'smooth'
  | 'sharp'
  | 'bounce'
  | 'elastic'

// Spring animation presets
export type SpringPreset = 
  | 'gentle'
  | 'wobbly'
  | 'stiff'
  | 'slow'
  | 'bouncy'
  | 'snappy'

// Animation direction types
export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

// Scroll animation types
export interface ScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
  delay?: number
  duration?: number
}

export interface ScrollTriggerOptions {
  start?: number | string
  end?: number | string
  scrub?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onUpdate?: (progress: number) => void
  element?: Element | null
}

export interface ScrollTriggerReturn {
  isActive: boolean
  progress: number
  hasEntered: boolean
  hasLeft: boolean
}

// Intersection observer types
export interface IntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
  initialInView?: boolean
}

export interface IntersectionObserverReturn {
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
  elementRef: React.RefObject<Element>
}

// Stagger animation types
export interface StaggerAnimationOptions {
  staggerDelay?: number
  delayChildren?: number
  staggerDirection?: 1 | -1
}

// Parallax types
export interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  offset?: number
}

// Animation context types
export interface AnimationContextType {
  prefersReducedMotion: boolean
  animationsEnabled: boolean
  setAnimationsEnabled: (enabled: boolean) => void
  globalSpeed: number
  setGlobalSpeed: (speed: number) => void
}

// Component animation props
export interface AnimatedElementProps extends HTMLMotionProps<'div'> {
  animation?: AnimationPreset
  variants?: Variants
  delay?: number
  duration?: number
  triggerOnce?: boolean
  threshold?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  hoverContent?: React.ReactNode
  direction?: AnimationDirection
  offset?: number
  className?: string
  contentClassName?: string
}

export interface FlipCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  trigger?: 'hover' | 'click'
  isFlipped?: boolean
  onFlip?: (isFlipped: boolean) => void
  className?: string
  frontClassName?: string
  backClassName?: string
}

export interface RevealOnScrollProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  effect?: 'fade' | 'slide' | 'scale' | 'parallax' | 'stagger'
  direction?: AnimationDirection
  distance?: number
  delay?: number
  duration?: number
  staggerDelay?: number
  parallaxSpeed?: number
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

// Loading animation types
export interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bars' | 'ring'
  color?: 'primary' | 'secondary' | 'accent' | 'muted'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

// Progress animation types
export interface ProgressAnimationProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'striped' | 'animated'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  showValue?: boolean
  label?: string
  className?: string
  barClassName?: string
}

// Text animation types
export interface TextAnimationProps {
  children: string
  variant?: 'typewriter' | 'fade' | 'slide' | 'stagger'
  speed?: number
  delay?: number
  className?: string
}

// Page transition types
export interface PageTransitionProps {
  children: React.ReactNode
  variant?: 'slide' | 'fade' | 'scale' | 'rotate'
  direction?: AnimationDirection
  duration?: number
  className?: string
}

// Modal animation types
export interface ModalAnimationProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  variant?: 'scale' | 'slide' | 'fade'
  className?: string
  backdropClassName?: string
}

// Animation utilities
export interface AnimationUtilities {
  createStaggerVariants: (baseVariants: Variants, staggerDelay?: number, delayChildren?: number) => Variants
  createSlideVariants: (direction: AnimationDirection, distance?: number) => Variants
  createScaleVariants: (initialScale?: number, hoverScale?: number) => Variants
  createScrollVariants: (threshold?: number, yOffset?: number) => Variants
  createLoadingVariants: (type?: 'pulse' | 'spin' | 'bounce' | 'wave') => Variants
  combineVariants: (...variantObjects: Variants[]) => Variants
}

// Performance types
export interface AnimationPerformanceSettings {
  targetFPS: number
  minFPS: number
  lowComplexity: number
  mediumComplexity: number
  highComplexity: number
  reducedMotion: {
    duration: number
    disableParallax: boolean
    disableAutoplay: boolean
    simplifyTransitions: boolean
  }
}


export interface ScrollPosition {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down' | null
  isScrolling: boolean
  scrollPercentage: number
}

// Theme animation types
export interface ThemeAnimationProps {
  duration?: number
  easing?: AnimationEasing
  properties?: string[]
}

// Custom hook return types
export interface UseScrollPositionReturn extends ScrollPosition {
  isScrollPast: (threshold: number) => boolean
  getScrollProgress: (start: number, end: number) => number
  getParallaxOffset: (speed?: number) => number
}

export interface UseAnimationReturn {
  isAnimating: boolean
  startAnimation: () => void
  stopAnimation: () => void
  resetAnimation: () => void
}

export interface UseReducedMotionReturn {
  prefersReducedMotion: boolean
  getSafeDuration: (duration: number) => number
  getSafeDelay: (delay: number) => number
  getSafeTransition: (transition: any) => any
  getSafeVariants: (variants: any, fallback?: any) => any
}
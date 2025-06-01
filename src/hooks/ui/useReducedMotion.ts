'use client'

import { useMediaQuery } from './useMediaQuery'

/**
 * Hook to detect if user prefers reduced motion
 * Respects the prefers-reduced-motion CSS media query
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Hook that returns safe animation values based on user preference
 */
export function useSafeAnimation() {
  const prefersReducedMotion = useReducedMotion()

  const getSafeDuration = (duration: number): number => {
    return prefersReducedMotion ? 0 : duration
  }

  const getSafeDelay = (delay: number): number => {
    return prefersReducedMotion ? 0 : delay
  }

  const getSafeTransition = (transition: any): any => {
    if (prefersReducedMotion) {
      return { duration: 0 }
    }
    return transition
  }

  const getSafeVariants = (variants: any, fallback: any = {}): any => {
    if (prefersReducedMotion) {
      return fallback
    }
    return variants
  }

  return {
    prefersReducedMotion,
    getSafeDuration,
    getSafeDelay,
    getSafeTransition,
    getSafeVariants,
  }
}

/**
 * Hook for conditionally applying animations
 */
export function useConditionalAnimation<T>(
  animatedValue: T,
  staticValue: T
): T {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? staticValue : animatedValue
}
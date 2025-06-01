'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/ui/useReducedMotion'

interface AnimationContextType {
  prefersReducedMotion: boolean
  animationsEnabled: boolean
  setAnimationsEnabled: (enabled: boolean) => void
  globalSpeed: number
  setGlobalSpeed: (speed: number) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

interface AnimationProviderProps {
  children: React.ReactNode
  defaultEnabled?: boolean
  defaultSpeed?: number
}

export function AnimationProvider({ 
  children, 
  defaultEnabled = true,
  defaultSpeed = 1
}: AnimationProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const [animationsEnabled, setAnimationsEnabled] = useState(defaultEnabled)
  const [globalSpeed, setGlobalSpeed] = useState(defaultSpeed)

  // Respect user's reduced motion preference
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimationsEnabled(false)
    }
  }, [prefersReducedMotion])

  // Set CSS custom property for global animation speed
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--animation-speed-multiplier', 
      globalSpeed.toString()
    )
  }, [globalSpeed])

  // Set CSS custom property for animations enabled state
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--animations-enabled', 
      animationsEnabled ? '1' : '0'
    )
  }, [animationsEnabled])

  const contextValue: AnimationContextType = {
    prefersReducedMotion,
    animationsEnabled: animationsEnabled && !prefersReducedMotion,
    setAnimationsEnabled,
    globalSpeed,
    setGlobalSpeed,
  }

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimationContext must be used within an AnimationProvider')
  }
  return context
}

// Hook for getting animation duration with global speed multiplier
export function useAnimationDuration(baseDuration: number) {
  const { animationsEnabled, globalSpeed } = useAnimationContext()
  
  if (!animationsEnabled) {
    return 0
  }
  
  return baseDuration / globalSpeed
}

// Hook for getting animation variants based on context
export function useAnimationVariants() {
  const { animationsEnabled } = useAnimationContext()
  
  const getVariants = (enabledVariants: any, disabledVariants?: any) => {
    if (!animationsEnabled) {
      return disabledVariants || {
        initial: {},
        animate: {},
        exit: {}
      }
    }
    return enabledVariants
  }
  
  return { getVariants }
}

// Hook for conditional animation properties
export function useConditionalAnimation() {
  const { animationsEnabled, globalSpeed, prefersReducedMotion } = useAnimationContext()
  
  const getAnimationProps = (props: any) => {
    if (!animationsEnabled || prefersReducedMotion) {
      return {
        initial: false,
        animate: false,
        transition: { duration: 0 }
      }
    }
    
    // Apply global speed multiplier to duration
    if (props.transition?.duration) {
      props.transition.duration = props.transition.duration / globalSpeed
    }
    
    return props
  }
  
  const shouldAnimate = animationsEnabled && !prefersReducedMotion
  
  return {
    shouldAnimate,
    getAnimationProps,
    globalSpeed,
    prefersReducedMotion
  }
}

// Hook for performance-aware animations
export function usePerformanceAnimation() {
  const { animationsEnabled } = useAnimationContext()
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high')
  
  useEffect(() => {
    // Check for performance hints
    const connection = (navigator as any).connection
    const memory = (performance as any).memory
    
    let mode: 'high' | 'medium' | 'low' = 'high'
    
    // Reduced performance mode for slow connections
    if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
      mode = 'low'
    } else if (connection?.effectiveType === '3g') {
      mode = 'medium'
    }
    
    // Reduced performance mode for low memory devices
    if (memory?.usedJSHeapSize && memory.totalJSHeapSize) {
      const memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize
      if (memoryUsage > 0.8) {
        mode = 'low'
      } else if (memoryUsage > 0.6) {
        mode = 'medium'
      }
    }
    
    setPerformanceMode(mode)
  }, [])
  
  const getPerformanceConfig = () => {
    if (!animationsEnabled) {
      return { maxConcurrentAnimations: 0, reduceComplexity: true }
    }
    
    switch (performanceMode) {
      case 'low':
        return { maxConcurrentAnimations: 3, reduceComplexity: true }
      case 'medium':
        return { maxConcurrentAnimations: 8, reduceComplexity: false }
      case 'high':
      default:
        return { maxConcurrentAnimations: 15, reduceComplexity: false }
    }
  }
  
  return {
    performanceMode,
    getPerformanceConfig,
    shouldReduceComplexity: performanceMode === 'low'
  }
}

// Hook for managing animation queues
export function useAnimationQueue() {
  const [animationQueue, setAnimationQueue] = useState<string[]>([])
  const { getPerformanceConfig } = usePerformanceAnimation()
  
  const addToQueue = (animationId: string) => {
    setAnimationQueue(prev => {
      const { maxConcurrentAnimations } = getPerformanceConfig()
      if (prev.length >= maxConcurrentAnimations) {
        return [...prev.slice(1), animationId]
      }
      return [...prev, animationId]
    })
  }
  
  const removeFromQueue = (animationId: string) => {
    setAnimationQueue(prev => prev.filter(id => id !== animationId))
  }
  
  const clearQueue = () => {
    setAnimationQueue([])
  }
  
  return {
    animationQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    queueLength: animationQueue.length
  }
}

// Hook for animation timing coordination
export function useAnimationTiming() {
  const { globalSpeed } = useAnimationContext()
  
  const getStaggerDelay = (index: number, baseDelay: number = 0.1) => {
    return (index * baseDelay) / globalSpeed
  }
  
  const getScaledDuration = (baseDuration: number) => {
    return baseDuration / globalSpeed
  }
  
  const getScaledDelay = (baseDelay: number) => {
    return baseDelay / globalSpeed
  }
  
  return {
    getStaggerDelay,
    getScaledDuration,
    getScaledDelay,
    globalSpeed
  }
}
'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useScrollPosition } from './useScrollPosition'

interface ScrollTriggerOptions {
  start?: number | string // Pixel value or percentage like "50%"
  end?: number | string
  scrub?: boolean // Whether to animate based on scroll progress
  onEnter?: () => void
  onLeave?: () => void
  onUpdate?: (progress: number) => void
  element?: Element | null
}

interface ScrollTriggerReturn {
  isActive: boolean
  progress: number // 0 to 1 between start and end
  hasEntered: boolean
  hasLeft: boolean
}

export function useScrollTrigger(
  options: ScrollTriggerOptions = {}
): ScrollTriggerReturn {
  const {
    start = 0,
    end,
    scrub = false,
    onEnter,
    onLeave,
    onUpdate,
    element
  } = options

  const { scrollY } = useScrollPosition()
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const [hasLeft, setHasLeft] = useState(false)

  const elementRef = useRef<Element | null>(element || null)

  // Convert start/end values to pixels
  const getPixelValue = useCallback((value: number | string, element?: Element | null): number => {
    if (typeof value === 'number') return value
    
    if (typeof value === 'string' && value.endsWith('%')) {
      const percentage = parseFloat(value) / 100
      
      if (element) {
        const rect = element.getBoundingClientRect()
        return window.scrollY + rect.top + (rect.height * percentage)
      } else {
        return window.innerHeight * percentage
      }
    }
    
    return 0
  }, [])

  const calculateTriggerPoints = useCallback(() => {
    const targetElement = elementRef.current
    
    let startPixel: number
    let endPixel: number

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      const elementTop = window.scrollY + rect.top
      const elementBottom = elementTop + rect.height

      startPixel = typeof start === 'string' 
        ? getPixelValue(start, targetElement)
        : elementTop + start

      endPixel = end !== undefined
        ? (typeof end === 'string' ? getPixelValue(end, targetElement) : elementTop + end)
        : elementBottom
    } else {
      startPixel = getPixelValue(start)
      endPixel = end !== undefined ? getPixelValue(end) : window.innerHeight
    }

    return { startPixel, endPixel }
  }, [start, end, getPixelValue])

  useEffect(() => {
    const { startPixel, endPixel } = calculateTriggerPoints()
    
    const currentlyActive = scrollY >= startPixel && scrollY <= endPixel
    const currentProgress = endPixel > startPixel 
      ? Math.max(0, Math.min(1, (scrollY - startPixel) / (endPixel - startPixel)))
      : 0

    // Update state
    if (currentlyActive !== isActive) {
      setIsActive(currentlyActive)
      
      if (currentlyActive && !hasEntered) {
        setHasEntered(true)
        onEnter?.()
      } else if (!currentlyActive && hasEntered && !hasLeft) {
        setHasLeft(true)
        onLeave?.()
      }
    }

    if (scrub || currentlyActive) {
      setProgress(currentProgress)
      onUpdate?.(currentProgress)
    }
  }, [
    scrollY, 
    isActive, 
    hasEntered, 
    hasLeft, 
    scrub, 
    onEnter, 
    onLeave, 
    onUpdate, 
    calculateTriggerPoints
  ])

  return {
    isActive,
    progress,
    hasEntered,
    hasLeft,
  }
}

// Hook for creating staggered scroll triggers
export function useStaggeredScrollTrigger(
  count: number,
  options: Omit<ScrollTriggerOptions, 'onEnter' | 'onLeave'> & {
    staggerDelay?: number
    onEnterItem?: (index: number) => void
    onLeaveItem?: (index: number) => void
  } = {}
): Array<ScrollTriggerReturn> {
  const { staggerDelay = 100, onEnterItem, onLeaveItem, ...triggerOptions } = options
  const [triggers, setTriggers] = useState<ScrollTriggerReturn[]>(
    Array(count).fill({
      isActive: false,
      progress: 0,
      hasEntered: false,
      hasLeft: false,
    })
  )

  const baseTrigger = useScrollTrigger(triggerOptions)

  useEffect(() => {
    if (baseTrigger.isActive) {
      // Stagger the activation of each item
      triggers.forEach((_, index) => {
        setTimeout(() => {
          setTriggers(prev => {
            const newTriggers = [...prev]
            if (!newTriggers[index].hasEntered) {
              newTriggers[index] = {
                ...baseTrigger,
                hasEntered: true,
              }
              onEnterItem?.(index)
            }
            return newTriggers
          })
        }, index * staggerDelay)
      })
    }
  }, [baseTrigger.isActive, staggerDelay, onEnterItem])

  return triggers
}

// Hook for scroll-based timeline animations
export function useScrollTimeline(
  keyframes: Array<{
    at: number | string // Position in timeline (0-1 or percentage)
    callback: () => void
  }>,
  options: ScrollTriggerOptions = {}
): ScrollTriggerReturn {
  const trigger = useScrollTrigger({
    ...options,
    scrub: true,
    onUpdate: (progress) => {
      keyframes.forEach(keyframe => {
        const at = typeof keyframe.at === 'string' 
          ? parseFloat(keyframe.at) / 100 
          : keyframe.at
        
        // Trigger callback when progress crosses the keyframe point
        if (progress >= at && progress <= at + 0.01) {
          keyframe.callback()
        }
      })
      
      options.onUpdate?.(progress)
    }
  })

  return trigger
}
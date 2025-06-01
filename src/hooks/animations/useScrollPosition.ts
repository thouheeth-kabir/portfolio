'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

export interface ScrollPosition {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down' | null
  isScrolling: boolean
  scrollPercentage: number
}

export interface UseScrollPositionOptions {
  throttleMs?: number
  element?: Element | Window
}

export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPosition {
  const { throttleMs = 16, element = typeof window !== 'undefined' ? window : null } = options
  
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    isScrolling: false,
    scrollPercentage: 0,
  })

  const lastScrollY = useRef(0)
  const isScrollingTimeout = useRef<NodeJS.Timeout>()
  const throttleTimeout = useRef<NodeJS.Timeout>()

  const updateScrollPosition = useCallback(() => {
    if (!element) return

    const isWindow = element === window
    const scrollY = isWindow ? window.scrollY : (element as Element).scrollTop
    const scrollX = isWindow ? window.scrollX : (element as Element).scrollLeft
    
    const scrollDirection = scrollY > lastScrollY.current ? 'down' : 
                           scrollY < lastScrollY.current ? 'up' : null

    const scrollHeight = isWindow 
      ? document.documentElement.scrollHeight - window.innerHeight
      : (element as Element).scrollHeight - (element as Element).clientHeight
    
    const scrollPercentage = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0

    setScrollPosition({
      scrollY,
      scrollX,
      scrollDirection,
      isScrolling: true,
      scrollPercentage: Math.min(Math.max(scrollPercentage, 0), 100),
    })

    lastScrollY.current = scrollY

    if (isScrollingTimeout.current) {
      clearTimeout(isScrollingTimeout.current)
    }

    isScrollingTimeout.current = setTimeout(() => {
      setScrollPosition(prev => ({
        ...prev,
        isScrolling: false,
      }))
    }, 150)
  }, [element])

  const throttledUpdateScrollPosition = useCallback(() => {
    if (throttleTimeout.current) {
      clearTimeout(throttleTimeout.current)
    }
    throttleTimeout.current = setTimeout(updateScrollPosition, throttleMs)
  }, [updateScrollPosition, throttleMs])

  useEffect(() => {
    if (!element) return

    updateScrollPosition()
    element.addEventListener('scroll', throttledUpdateScrollPosition, { passive: true })

    return () => {
      element.removeEventListener('scroll', throttledUpdateScrollPosition)
      if (isScrollingTimeout.current) clearTimeout(isScrollingTimeout.current)
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current)
    }
  }, [element, throttledUpdateScrollPosition, updateScrollPosition])

  return scrollPosition
}

export function useScrollPast(threshold: number): boolean {
  const { scrollY } = useScrollPosition()
  return scrollY > threshold
}

export function useScrollProgress(start: number, end: number): number {
  const { scrollY } = useScrollPosition()
  if (scrollY <= start) return 0
  if (scrollY >= end) return 1
  return (scrollY - start) / (end - start)
}

export function useParallax(speed: number = 0.5): number {
  const { scrollY } = useScrollPosition()
  return scrollY * speed
}

export function useScrollTransform() {
  const { scrollY, scrollPercentage } = useScrollPosition()
  
  return {
    getTranslateY: (speed: number = 0.5) => scrollY * speed,
    getTranslateX: (speed: number = 0.5) => scrollY * speed,
    getRotate: (speed: number = 0.1) => scrollY * speed,
    getScale: (minScale: number = 0.8, maxScale: number = 1.2) => {
      const progress = scrollPercentage / 100
      return minScale + (maxScale - minScale) * progress
    },
    getOpacity: (start: number = 0, end: number = 100) => {
      if (scrollPercentage <= start) return 1
      if (scrollPercentage >= end) return 0
      return 1 - ((scrollPercentage - start) / (end - start))
    },
    scrollY,
    scrollPercentage
  }
}
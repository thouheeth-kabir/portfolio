'use client'

import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height: number
  innerWidth: number
  innerHeight: number
  outerWidth: number
  outerHeight: number
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

// Hook for getting viewport dimensions
export function useViewport() {
  const { width, height } = useWindowSize()
  
  return {
    width,
    height,
    isLandscape: width > height,
    isPortrait: height > width,
    aspectRatio: width / height,
  }
}

// Hook for detecting window size changes with debouncing
export function useDebouncedWindowSize(delay: number = 250): WindowSize {
  const windowSize = useWindowSize()
  const [debouncedSize, setDebouncedSize] = useState(windowSize)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSize(windowSize)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [windowSize, delay])

  return debouncedSize
}

// Hook for getting element dimensions
export function useElementSize<T extends HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [elementRef, setElementRef] = useState<T | null>(null)

  useEffect(() => {
    if (!elementRef) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    resizeObserver.observe(elementRef)

    return () => {
      resizeObserver.disconnect()
    }
  }, [elementRef])

  return [setElementRef, size] as const
}
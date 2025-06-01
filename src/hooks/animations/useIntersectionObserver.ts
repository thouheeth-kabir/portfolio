'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
  initialInView?: boolean
}

interface UseIntersectionObserverReturn {
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
  elementRef: React.RefObject<Element>
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    initialInView = false,
  } = options

  const elementRef = useRef<Element>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(initialInView)

  const updateEntry = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setEntry(entry)
    
    if (entry.isIntersecting) {
      setIsIntersecting(true)
    } else if (!triggerOnce) {
      setIsIntersecting(false)
    }
  }, [triggerOnce])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, updateEntry])

  return { isIntersecting, entry, elementRef }
}

// Hook for observing multiple elements
interface UseMultipleIntersectionObserverOptions extends UseIntersectionObserverOptions {
  elements?: string[] // Array of element IDs
}

interface UseMultipleIntersectionObserverReturn {
  entries: Record<string, IntersectionObserverEntry>
  intersectingElements: string[]
  activeSection: string | null
}

export function useMultipleIntersectionObserver(
  elementIds: string[],
  options: UseMultipleIntersectionObserverOptions = {}
): UseMultipleIntersectionObserverReturn {
  const {
    threshold = 0.3,
    root = null,
    rootMargin = '-20% 0px -70% 0px',
  } = options

  const [entries, setEntries] = useState<Record<string, IntersectionObserverEntry>>({})
  const [intersectingElements, setIntersectingElements] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const updateEntries = useCallback((observerEntries: IntersectionObserverEntry[]) => {
    const newEntries: Record<string, IntersectionObserverEntry> = {}
    const newIntersecting: string[] = []

    observerEntries.forEach((entry) => {
      const id = entry.target.id
      if (id) {
        newEntries[id] = entry
        if (entry.isIntersecting) {
          newIntersecting.push(id)
        }
      }
    })

    setEntries(prev => ({ ...prev, ...newEntries }))
    setIntersectingElements(newIntersecting)

    // Set active section to the first intersecting element
    if (newIntersecting.length > 0) {
      setActiveSection(newIntersecting[0])
    }
  }, [])

  useEffect(() => {
    if (elementIds.length === 0) return

    const observer = new IntersectionObserver(updateEntries, {
      threshold,
      root,
      rootMargin,
    })

    const elements = elementIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as Element[]

    elements.forEach(element => observer.observe(element))

    return () => {
      elements.forEach(element => observer.unobserve(element))
      observer.disconnect()
    }
  }, [elementIds, threshold, root, rootMargin, updateEntries])

  return { entries, intersectingElements, activeSection }
}
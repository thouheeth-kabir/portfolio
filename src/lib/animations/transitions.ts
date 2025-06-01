import type { Transition } from 'framer-motion'

// Easing functions
export const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  gentle: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const

// Duration presets
export const duration = {
  fastest: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slowest: 0.8,
} as const

// Spring configurations
export const spring = {
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 14,
  },
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
  },
  stiff: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
  slow: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 20,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 10,
  },
} as const

// Transition presets
export const transitions = {
  // Basic transitions
  fade: {
    duration: duration.normal,
    ease: easing.easeOut,
  } as Transition,
  
  fadeIn: {
    duration: duration.fast,
    ease: easing.easeOut,
  } as Transition,
  
  fadeOut: {
    duration: duration.fast,
    ease: easing.easeIn,
  } as Transition,

  // Slide transitions
  slide: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  slideGentle: spring.gentle,
  
  slideSnappy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  } as Transition,

  // Scale transitions
  scale: spring.gentle,
  
  scaleSnappy: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  } as Transition,

  // Rotation transitions
  rotate: {
    duration: duration.slow,
    ease: easing.easeInOut,
  } as Transition,

  // Hover transitions
  hover: {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  } as Transition,

  // Button press transitions
  tap: {
    type: 'spring',
    stiffness: 600,
    damping: 20,
  } as Transition,

  // Modal transitions
  modal: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  } as Transition,

  // Page transitions
  page: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  } as Transition,

  // Loading transitions
  pulse: {
    duration: 1.5,
    repeat: Infinity,
    ease: easing.easeInOut,
  } as Transition,

  // Stagger transitions
  stagger: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  } as Transition,

  staggerFast: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  } as Transition,

  staggerSlow: {
    staggerChildren: 0.2,
    delayChildren: 0.3,
  } as Transition,

  // Layout transitions
  layout: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  } as Transition,

  layoutGentle: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
  } as Transition,

  // Path drawing transitions (for SVG)
  draw: {
    type: 'spring',
    duration: 1.5,
    bounce: 0,
  } as Transition,

  drawSlow: {
    type: 'spring',
    duration: 2.5,
    bounce: 0,
  } as Transition,
} as const

// Utility functions for creating custom transitions
export const createSpring = (stiffness: number, damping: number): Transition => ({
  type: 'spring',
  stiffness,
  damping,
})

export const createTween = (duration: number, ease: number[]): Transition => ({
  duration,
  ease,
})

export const createStagger = (childrenDelay: number, delayChildren: number = 0): Transition => ({
  staggerChildren: childrenDelay,
  delayChildren,
})

// Responsive transitions (adjust based on reduced motion preference)
export const createResponsiveTransition = (
  normalTransition: Transition,
  reducedTransition: Transition = { duration: 0 }
): Transition => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return reducedTransition
  }
  return normalTransition
}

// Transition for theme changes
export const themeTransition: Transition = {
  duration: 0.3,
  ease: easing.easeInOut,
}

// Scroll-triggered transitions
export const scrollTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

// Complex multi-stage transitions
export const complexTransitions = {
  cardHover: {
    scale: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
    y: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
    boxShadow: {
      duration: 0.2,
      ease: easing.easeOut,
    },
  } as Record<string, Transition>,

  modalEnter: {
    opacity: {
      duration: 0.2,
      ease: easing.easeOut,
    },
    scale: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 0.1,
    },
    y: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 0.1,
    },
  } as Record<string, Transition>,

  pageTransition: {
    x: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
    opacity: {
      duration: 0.3,
      ease: easing.easeInOut,
    },
  } as Record<string, Transition>,
} as const
import type { Variants, Transition, MotionValue } from 'framer-motion'
import { transform } from 'framer-motion'

// Utility for creating staggered animations
export const createStaggerVariants = (
  baseVariants: Variants,
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: baseVariants.hidden,
  visible: {
    ...baseVariants.visible,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
  exit: {
    ...baseVariants.exit,
    transition: {
      staggerChildren: staggerDelay * 0.5,
      staggerDirection: -1,
    },
  },
})

// Utility for creating responsive variants based on screen size
export const createResponsiveVariants = (
  mobileVariants: Variants,
  desktopVariants: Variants
): Variants => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  return isMobile ? mobileVariants : desktopVariants
}

// Utility for creating directional slide variants
export const createSlideVariants = (
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 30
): Variants => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      default:
        return { y: distance }
    }
  }

  const offset = getOffset()

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      ...offset,
    },
  }
}

// Utility for creating scale variants with custom scale values
export const createScaleVariants = (
  initialScale: number = 0.8,
  hoverScale: number = 1.05
): Variants => ({
  initial: {
    scale: initialScale,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: hoverScale,
  },
  tap: {
    scale: 0.95,
  },
  exit: {
    scale: initialScale,
    opacity: 0,
  },
})

// Utility for creating parallax transforms
export const createParallaxTransform = (
  scrollY: MotionValue<number>,
  speed: number = 0.5
) => {
  return transform(scrollY.get(), [0, 1000], [0, 1000 * speed])
}

// Utility for creating scroll-triggered variants
export const createScrollVariants = (
  threshold: number = 0.1,
  yOffset: number = 50
): Variants => ({
  hidden: {
    opacity: 0,
    y: yOffset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
})

// Utility for creating hover lift effect
export const createHoverLift = (liftDistance: number = 10): Variants => ({
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -liftDistance,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
})

// Utility for creating loading animations
export const createLoadingVariants = (
  type: 'pulse' | 'spin' | 'bounce' | 'wave' = 'pulse'
): Variants => {
  switch (type) {
    case 'pulse':
      return {
        animate: {
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      }
    case 'spin':
      return {
        animate: {
          rotate: 360,
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          },
        },
      }
    case 'bounce':
      return {
        animate: {
          y: [0, -20, 0],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      }
    case 'wave':
      return {
        animate: {
          scaleY: [1, 0.4, 1],
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      }
    default:
      return {}
  }
}

// Utility for creating text reveal animations
export const createTextRevealVariants = (
  direction: 'up' | 'down' = 'up',
  staggerDelay: number = 0.05
): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 20 : -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

// Utility for creating card flip animations
export const createFlipVariants = (
  axis: 'x' | 'y' = 'y'
): Variants => ({
  front: {
    [axis === 'y' ? 'rotateY' : 'rotateX']: 0,
  },
  back: {
    [axis === 'y' ? 'rotateY' : 'rotateX']: 180,
  },
})

// Utility for creating morphing animations
export const createMorphVariants = (
  initialPath: string,
  finalPath: string
): Variants => ({
  initial: {
    d: initialPath,
  },
  animate: {
    d: finalPath,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
})

// Utility for creating elastic animations
export const createElasticVariants = (): Variants => ({
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
})

// Utility for creating typewriter effect
export const createTypewriterVariants = (text: string): Variants => {
  const characters = text.split('')
  
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  }
}

// Utility for combining multiple variant objects
export const combineVariants = (...variantObjects: Variants[]): Variants => {
  return variantObjects.reduce((combined, variants) => {
    Object.keys(variants).forEach(key => {
      if (combined[key]) {
        combined[key] = { ...combined[key], ...variants[key] }
      } else {
        combined[key] = variants[key]
      }
    })
    return combined
  }, {} as Variants)
}

// Utility for creating conditional variants based on props
export const createConditionalVariants = (
  condition: boolean,
  trueVariants: Variants,
  falseVariants: Variants
): Variants => {
  return condition ? trueVariants : falseVariants
}

// Performance optimization: Pre-calculate common values
export const commonValues = {
  center: { x: '50%', y: '50%' },
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1 },
  hover: { scale: 1.05, y: -5 },
  tap: { scale: 0.95 },
} as const
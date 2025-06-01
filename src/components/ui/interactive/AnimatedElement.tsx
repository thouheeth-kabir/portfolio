'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/animations/useIntersectionObserver'
import { cn } from '@/lib/utils/cn'

interface AnimatedElementProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'custom'
  variants?: Variants
  delay?: number
  duration?: number
  triggerOnce?: boolean
  threshold?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const defaultVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
}

export const AnimatedElement = forwardRef<HTMLElement, AnimatedElementProps>(
  ({ 
    children, 
    animation = 'fadeIn',
    variants: customVariants,
    delay = 0,
    duration = 0.6,
    triggerOnce = true,
    threshold = 0.1,
    className,
    as = 'div',
    ...props 
  }, ref) => {
    const { isIntersecting, elementRef } = useIntersectionObserver({
      threshold,
      triggerOnce
    })

    const variants = customVariants || (animation !== 'custom' ? defaultVariants[animation] : undefined)
    const Component = motion[as as keyof typeof motion] as any

    return (
      <Component
        ref={(node: any) => {
          // Handle the intersection observer ref (typically a mutable ref object)
          if (elementRef && 'current' in elementRef) {
            ;(elementRef as React.MutableRefObject<any>).current = node
          }
          
          // Handle the forwarded ref
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref && 'current' in ref) {
            ;(ref as React.MutableRefObject<any>).current = node
          }
        }}
        variants={variants}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: "easeOut"
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

AnimatedElement.displayName = 'AnimatedElement'
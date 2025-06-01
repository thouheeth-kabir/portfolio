'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps, useScroll, useTransform } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/animations/useIntersectionObserver'
import { cn } from '@/lib/utils/cn'

interface RevealOnScrollProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  effect?: 'fade' | 'slide' | 'scale' | 'parallax' | 'stagger'
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  delay?: number
  duration?: number
  staggerDelay?: number
  parallaxSpeed?: number
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

export const RevealOnScroll = forwardRef<HTMLDivElement, RevealOnScrollProps>(
  ({ 
    children,
    effect = 'fade',
    direction = 'up',
    distance = 50,
    delay = 0,
    duration = 0.8,
    staggerDelay = 0.1,
    parallaxSpeed = 0.5,
    threshold = 0.1,
    triggerOnce = true,
    className,
    ...props 
  }, ref) => {
    const { isIntersecting, elementRef } = useIntersectionObserver({
      threshold,
      triggerOnce
    })

    const { scrollYProgress } = useScroll({
      target: elementRef as any,
      offset: ['start end', 'end start']
    })

    // Parallax effect
    const parallaxY = useTransform(
      scrollYProgress,
      [0, 1],
      [distance * parallaxSpeed, -distance * parallaxSpeed]
    )

    const getAnimationVariants = () => {
      switch (effect) {
        case 'fade':
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }
        case 'slide':
          const slideInitial = direction === 'up' || direction === 'down' 
            ? { y: direction === 'up' ? distance : -distance }
            : { x: direction === 'left' ? distance : -distance }
          return {
            hidden: { opacity: 0, ...slideInitial },
            visible: { opacity: 1, x: 0, y: 0 }
          }
        case 'scale':
          return {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
          }
        case 'parallax':
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }
        case 'stagger':
          return {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }
        default:
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }
      }
    }

    const getTransition = () => {
      const baseTransition = {
        duration,
        delay,
        ease: 'easeOut' as const
      }

      if (effect === 'stagger') {
        return {
          ...baseTransition,
          staggerChildren: staggerDelay,
          delayChildren: delay
        }
      }

      return baseTransition
    }

    const variants = getAnimationVariants()

    // Combine refs function
    const combineRefs = (node: HTMLDivElement | null) => {
      // Set the intersection observer ref by casting to mutable
      ;(elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      
      // Forward the external ref
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    if (effect === 'parallax') {
      return (
        <motion.div
          ref={combineRefs}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={variants}
          transition={getTransition()}
          style={{ y: parallaxY }}
          className={cn(className)}
          {...props}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <motion.div
        ref={combineRefs}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={variants}
        transition={getTransition()}
        className={cn(className)}
        {...props}
      >
        {effect === 'stagger' ? (
          Array.isArray(children) ? (
            children.map((child, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, delay: index * staggerDelay }}
              >
                {child}
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {children}
            </motion.div>
          )
        ) : (
          children
        )}
      </motion.div>
    )
  }
)

RevealOnScroll.displayName = 'RevealOnScroll'
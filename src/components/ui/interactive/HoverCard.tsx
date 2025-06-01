'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  hoverContent?: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
  className?: string
  contentClassName?: string
}

const directionVariants = {
  up: { y: -8, scale: 1.02 },
  down: { y: 8, scale: 1.02 },
  left: { x: -8, scale: 1.02 },
  right: { x: 8, scale: 1.02 },
} as const

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ 
    children, 
    hoverContent,
    direction = 'up',
    offset = 8,
    className,
    contentClassName,
    ...props 
  }, ref) => {
    const hoverVariant = directionVariants[direction]

    return (
      <motion.div
        ref={ref}
        className={cn('relative group cursor-pointer', className)}
        whileHover={hoverVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
        
        {hoverContent && (
          <motion.div
            className={cn(
              'absolute z-10 opacity-0 group-hover:opacity-100',
              'pointer-events-none group-hover:pointer-events-auto',
              'transition-opacity duration-200',
              contentClassName
            )}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {hoverContent}
          </motion.div>
        )}
      </motion.div>
    )
  }
)

HoverCard.displayName = 'HoverCard'
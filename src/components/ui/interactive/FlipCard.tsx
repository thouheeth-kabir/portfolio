'use client'

import { useState, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface FlipCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  trigger?: 'hover' | 'click'
  isFlipped?: boolean
  onFlip?: (isFlipped: boolean) => void
  className?: string
  frontClassName?: string
  backClassName?: string
}

export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  ({ 
    frontContent,
    backContent,
    direction = 'horizontal',
    trigger = 'hover',
    isFlipped: controlledFlipped,
    onFlip,
    className,
    frontClassName,
    backClassName,
    ...props 
  }, ref) => {
    const [internalFlipped, setInternalFlipped] = useState(false)
    const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped

    const handleFlip = () => {
      if (controlledFlipped === undefined) {
        setInternalFlipped(!internalFlipped)
      }
      onFlip?.(!isFlipped)
    }

    const rotateAxis = direction === 'horizontal' ? 'rotateY' : 'rotateX'
    const frontRotation = isFlipped ? (direction === 'horizontal' ? 180 : 180) : 0
    const backRotation = isFlipped ? 0 : (direction === 'horizontal' ? -180 : -180)

    const triggerProps = trigger === 'hover' 
      ? { onHoverStart: () => handleFlip(), onHoverEnd: () => handleFlip() }
      : { onClick: handleFlip }

    return (
      <motion.div
        ref={ref}
        className={cn('relative preserve-3d', className)}
        style={{ transformStyle: 'preserve-3d' }}
        {...triggerProps}
        {...props}
      >
        {/* Front */}
        <motion.div
          className={cn(
            'w-full h-full backface-hidden',
            frontClassName
          )}
          animate={{ [rotateAxis]: frontRotation }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </motion.div>

        {/* Back */}
        <motion.div
          className={cn(
            'absolute inset-0 w-full h-full backface-hidden',
            backClassName
          )}
          animate={{ [rotateAxis]: backRotation }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: direction === 'horizontal' ? 'rotateY(-180deg)' : 'rotateX(-180deg)'
          }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    )
  }
)

FlipCard.displayName = 'FlipCard'
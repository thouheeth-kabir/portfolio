'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bars' | 'ring'
  color?: 'primary' | 'secondary' | 'accent' | 'muted'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
} as const

const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  muted: 'text-muted-foreground',
} as const

const speedMap = {
  slow: 1.5,
  normal: 1,
  fast: 0.5,
} as const

export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ 
    size = 'md', 
    variant = 'default',
    color = 'primary',
    speed = 'normal',
    className 
  }, ref) => {
    const duration = speedMap[speed]

    const renderSpinner = () => {
      switch (variant) {
        case 'default':
          return (
            <motion.div
              className={cn(
                'border-2 border-current border-t-transparent rounded-full',
                sizeMap[size]
              )}
              animate={{ rotate: 360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
            />
          )

        case 'dots':
          return (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'bg-current rounded-full',
                    size === 'sm' ? 'w-1 h-1' : 
                    size === 'md' ? 'w-1.5 h-1.5' :
                    size === 'lg' ? 'w-2 h-2' : 'w-3 h-3'
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: duration * 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          )

        case 'pulse':
          return (
            <motion.div
              className={cn(
                'bg-current rounded-full',
                sizeMap[size]
              )}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )

        case 'bars':
          return (
            <div className="flex items-end space-x-0.5">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'bg-current',
                    size === 'sm' ? 'w-0.5 h-4' :
                    size === 'md' ? 'w-1 h-6' :
                    size === 'lg' ? 'w-1.5 h-8' : 'w-2 h-12'
                  )}
                  animate={{
                    scaleY: [1, 0.4, 1]
                  }}
                  transition={{
                    duration: duration * 0.8,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          )

        case 'ring':
          return (
            <div className={cn('relative', sizeMap[size])}>
              <motion.div
                className="absolute inset-0 border-2 border-current border-opacity-25 rounded-full"
              />
              <motion.div
                className="absolute inset-0 border-2 border-transparent border-t-current rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )

        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          colorMap[color],
          className
        )}
        role="status"
        aria-label="Loading"
      >
        {renderSpinner()}
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'
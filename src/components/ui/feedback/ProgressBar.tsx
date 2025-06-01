'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'striped' | 'animated'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  showValue?: boolean
  label?: string
  className?: string
  barClassName?: string
}

const sizeMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const

const colorMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
} as const

const gradientMap = {
  primary: 'bg-gradient-to-r from-primary/80 to-primary',
  secondary: 'bg-gradient-to-r from-secondary/80 to-secondary',
  accent: 'bg-gradient-to-r from-accent/80 to-accent',
  success: 'bg-gradient-to-r from-green-400 to-green-600',
  warning: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
  error: 'bg-gradient-to-r from-red-400 to-red-600',
} as const

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    color = 'primary',
    showValue = false,
    label,
    className,
    barClassName
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const getBarClasses = () => {
      const baseClasses = 'h-full transition-all duration-300 ease-out'
      
      switch (variant) {
        case 'gradient':
          return cn(baseClasses, gradientMap[color])
        case 'striped':
          return cn(
            baseClasses,
            colorMap[color],
            'bg-[length:20px_20px] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_25%,rgba(255,255,255,.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.2)_75%,rgba(255,255,255,.2))]'
          )
        case 'animated':
          return cn(
            baseClasses,
            colorMap[color],
            'bg-[length:20px_20px] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_25%,rgba(255,255,255,.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.2)_75%,rgba(255,255,255,.2))]',
            'animate-[progress-stripes_1s_linear_infinite]'
          )
        default:
          return cn(baseClasses, colorMap[color])
      }
    }

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div
          className={cn(
            'w-full bg-muted rounded-full overflow-hidden',
            sizeMap[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${Math.round(percentage)}%`}
        >
          <motion.div
            className={cn(getBarClasses(), barClassName)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

// Circular Progress variant
interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  showValue?: boolean
  className?: string
}

export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ 
    value,
    max = 100,
    size = 100,
    strokeWidth = 8,
    color = 'primary',
    showValue = false,
    className
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className={cn('relative inline-flex', className)} style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          className="transform -rotate-90"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted/20"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={colorMap[color]}
          />
        </svg>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)

CircularProgress.displayName = 'CircularProgress'
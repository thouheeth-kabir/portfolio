import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface BadgeProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  className?: string
}

const badgeVariants = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  outline: 'text-foreground border border-border bg-transparent',
} as const

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
} as const

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    children, 
    variant = 'default', 
    size = 'md', 
    interactive = false,
    className,
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { scale: 1.05 } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          badgeVariants[variant],
          badgeSizes[size],
          interactive && 'cursor-pointer hover:opacity-80',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Badge.displayName = 'Badge'
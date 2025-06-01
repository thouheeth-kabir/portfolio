'use client'

import React, { forwardRef, use, useRef, useEffect, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useThemeCSS } from '@/hooks/useTheme'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'accent' | 'success' | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const buttonVariants = {
  primary: cn(
    'bg-primary-500 text-white border-primary-500',
    'hover:bg-primary-600 hover:border-primary-600',
    'active:bg-primary-700 active:border-primary-700',
    'focus:ring-primary-500/30',
    'disabled:bg-primary-300 disabled:border-primary-300'
  ),
  secondary: cn(
    'bg-secondary-500 text-white border-secondary-500',
    'hover:bg-secondary-600 hover:border-secondary-600',
    'active:bg-secondary-700 active:border-secondary-700',
    'focus:ring-secondary-500/30',
    'disabled:bg-secondary-300 disabled:border-secondary-300'
  ),
  accent: cn(
    'bg-accent-500 text-white border-accent-500',
    'hover:bg-accent-600 hover:border-accent-600',
    'active:bg-accent-700 active:border-accent-700',
    'focus:ring-accent-500/30',
    'disabled:bg-accent-300 disabled:border-accent-300'
  ),
  outline: cn(
    'bg-transparent text-foreground border-border',
    'hover:bg-muted hover:text-foreground',
    'active:bg-muted/80',
    'focus:ring-primary-500/30',
    'disabled:text-muted-foreground disabled:border-muted'
  ),
  ghost: cn(
    'bg-transparent text-foreground border-transparent',
    'hover:bg-muted hover:text-foreground',
    'active:bg-muted/80',
    'focus:ring-primary-500/30',
    'disabled:text-muted-foreground'
  ),
  destructive: cn(
    'bg-red-500 text-white border-red-500',
    'hover:bg-red-600 hover:border-red-600',
    'active:bg-red-700 active:border-red-700',
    'focus:ring-red-500/30',
    'disabled:bg-red-300 disabled:border-red-300'
  ),
  success: cn(
    'bg-green-500 text-white border-green-500',
    'hover:bg-green-600 hover:border-green-600',
    'active:bg-green-700 active:border-green-700',
    'focus:ring-green-500/30',
    'disabled:bg-green-300 disabled:border-green-300'
  ),
  warning: cn(
    'bg-yellow-500 text-yellow-900 border-yellow-500',
    'hover:bg-yellow-600 hover:border-yellow-600',
    'active:bg-yellow-700 active:border-yellow-700',
    'focus:ring-yellow-500/30',
    'disabled:bg-yellow-300 disabled:border-yellow-300'
  ),
} as const

const buttonSizes = {
  xs: 'h-6 px-2 text-xs gap-1',
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 py-2 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  xl: 'h-14 px-8 text-lg gap-2.5',
  icon: 'h-10 w-10 p-0',
} as const

const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const

const shadowVariants = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const

// Custom loading spinner component
const LoadingSpinner = ({ size = 16, className }: { size?: number; className?: string }) => (
  <Loader2 
    size={size} 
    className={cn('animate-spin', className)}
  />
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    disabled = false,
    loading = false,
    loadingText,
    fullWidth = false,
    rounded = 'md',
    shadow = 'none',
    className,
    leftIcon,
    rightIcon,
    ...props 
  }, ref) => {
    const { getCSSColorProperty } = useThemeCSS()
    const internalRef = useRef<HTMLButtonElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    
    // Combine internal ref with forwarded ref
    useEffect(() => {
      const element = internalRef.current
      if (element && typeof ref === 'function') {
        ref(element)
      } else if (ref && typeof ref === 'object') {
        ref.current = element
      }
    }, [ref])

    // Handle focus state
    useEffect(() => {
      const element = internalRef.current
      if (!element) return

      const handleFocus = () => setIsFocused(true)
      const handleBlur = () => setIsFocused(false)

      element.addEventListener('focus', handleFocus)
      element.addEventListener('blur', handleBlur)

      return () => {
        element.removeEventListener('focus', handleFocus)
        element.removeEventListener('blur', handleBlur)
      }
    }, [])

    const isDisabled = disabled || loading
    const isIconOnly = size === 'icon'
    
    // Get spinner size based on button size
    const spinnerSize = {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      icon: 16,
    }[size]

    // Animation variants
    const motionVariants = {
      hover: {
        scale: isDisabled ? 1 : 1.02,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 17 
        }
      },
      tap: {
        scale: isDisabled ? 1 : 0.98,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 17 
        }
      },
      initial: {
        scale: 1
      }
    }

    // Enhanced focus ring using theme colors
    const focusRingStyle = variant === 'primary' 
      ? { boxShadow: `0 0 0 2px ${getCSSColorProperty('primary-500', 0.3)}` }
      : variant === 'secondary'
      ? { boxShadow: `0 0 0 2px ${getCSSColorProperty('secondary-500', 0.3)}` }
      : variant === 'accent'
      ? { boxShadow: `0 0 0 2px ${getCSSColorProperty('accent-500', 0.3)}` }
      : { boxShadow: `0 0 0 2px ${getCSSColorProperty('primary-500', 0.3)}` }

    return (
      <motion.button
        ref={internalRef}
        disabled={isDisabled}
        variants={motionVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'relative overflow-hidden',
          
          // Variant styles
          buttonVariants[variant],
          
          // Size styles
          buttonSizes[size],
          
          // Shape styles
          roundedVariants[rounded],
          
          // Shadow styles
          shadowVariants[shadow],
          
          // Full width
          fullWidth && 'w-full',
          
          // Loading state
          loading && 'cursor-not-allowed',
          
          className
        )}
        style={{
          ...props.style,
          ...(isFocused ? focusRingStyle : {})
        }}
        {...props}
      >
        {/* Ripple effect overlay */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-[inherit] opacity-0"
          whileTap={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content container */}
        <div className="relative flex items-center justify-center gap-inherit">
          {/* Left icon or loading spinner */}
          {loading ? (
            <LoadingSpinner size={spinnerSize} />
          ) : leftIcon ? (
            <span className={cn('flex-shrink-0', isIconOnly && 'ml-0')}>
              {leftIcon}
            </span>
          ) : null}
          
          {/* Button text */}
          {!isIconOnly && (
            <span className={cn(
              'flex-1 truncate',
              loading && loadingText && 'ml-2'
            )}>
              {loading && loadingText ? loadingText : children}
            </span>
          )}
          
          {/* Right icon */}
          {!loading && rightIcon && !isIconOnly && (
            <span className="flex-shrink-0">
              {rightIcon}
            </span>
          )}
        </div>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// Button group component for related actions
interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  className?: string
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, orientation = 'horizontal', size, variant, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          orientation === 'horizontal' 
            ? 'flex-row [&>button:not(:first-child)]:border-l-0 [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none'
            : 'flex-col [&>button:not(:first-child)]:border-t-0 [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:first-child]:rounded-b-none [&>button:last-child]:rounded-t-none',
          className
        )}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child, {
              size: size || child.props.size,
              variant: variant || child.props.variant,
            } as ButtonProps)
          }
          return child
        })}
      </div>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'

// Icon button variant for common use case
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'size' | 'children'> & {
  icon: React.ReactNode
  size?: Exclude<ButtonProps['size'], 'icon'>
  'aria-label': string
}>(
  ({ icon, size = 'md', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        className={cn(
          {
            xs: 'h-6 w-6',
            sm: 'h-8 w-8', 
            md: 'h-10 w-10',
            lg: 'h-12 w-12',
            xl: 'h-14 w-14',
          }[size]
        )}
        {...props}
      >
        {icon}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'

// Export types for external use
export type ButtonVariant = ButtonProps['variant']
export type ButtonSize = ButtonProps['size']
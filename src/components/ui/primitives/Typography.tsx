import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface TypographyProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'foreground'
  align?: 'left' | 'center' | 'right'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const variantMap = {
  h1: { element: 'h1', styles: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight' },
  h2: { element: 'h2', styles: 'text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight' },
  h3: { element: 'h3', styles: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight' },
  h4: { element: 'h4', styles: 'text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight' },
  h5: { element: 'h5', styles: 'text-lg md:text-xl lg:text-2xl font-medium' },
  h6: { element: 'h6', styles: 'text-base md:text-lg lg:text-xl font-medium' },
  body1: { element: 'p', styles: 'text-base leading-relaxed' },
  body2: { element: 'p', styles: 'text-sm leading-relaxed' },
  caption: { element: 'span', styles: 'text-xs text-muted-foreground' },
  overline: { element: 'span', styles: 'text-xs uppercase tracking-wider font-medium' },
} as const

const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  muted: 'text-muted-foreground',
  foreground: 'text-foreground',
} as const

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

const weightMap = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ 
    children, 
    variant = 'body1', 
    color = 'foreground',
    align = 'left',
    weight,
    className,
    as,
    ...props 
  }, ref) => {
    const variantConfig = variantMap[variant]
    const Component = (as || variantConfig.element) as any

    return (
      <Component
        ref={ref}
        className={cn(
          variantConfig.styles,
          colorMap[color],
          alignMap[align],
          weight && weightMap[weight],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'

// Convenience components
export const Heading1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h1" {...props} />
)
Heading1.displayName = 'Heading1'

export const Heading2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h2" {...props} />
)
Heading2.displayName = 'Heading2'

export const Heading3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="h3" {...props} />
)
Heading3.displayName = 'Heading3'

export const Body = forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="body1" {...props} />
)
Body.displayName = 'Body'

export const Caption = forwardRef<HTMLSpanElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="caption" {...props} />
)
Caption.displayName = 'Caption'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  as?: keyof JSX.IntrinsicElements
  centered?: boolean
  fluid?: boolean
}

const containerSizes = {
  sm: 'max-w-3xl',      // ~768px
  md: 'max-w-5xl',      // ~1024px  
  lg: 'max-w-7xl',      // ~1280px
  xl: 'max-w-screen-2xl', // ~1536px
  full: 'max-w-none',   // No max width
} as const

const containerPadding = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
  xl: 'px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16',
} as const

export const Container = forwardRef<
  HTMLElement,
  ContainerProps
>(({ 
  children, 
  size = 'lg', 
  padding = 'md',
  className,
  as = 'div',
  centered = true,
  fluid = false,
  ...props 
}, ref) => {
  const Component = as as React.ElementType

  return (
    <Component
      ref={ref}
      className={cn(
        // Base container styles
        'w-full',
        
        // Centering
        centered && 'mx-auto',
        
        // Max width (unless fluid)
        !fluid && containerSizes[size],
        
        // Padding
        containerPadding[padding],
        
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

Container.displayName = 'Container'

// Specialized container variants for common use cases
export const PageContainer = forwardRef<
  HTMLElement,
  Omit<ContainerProps, 'size' | 'padding'> & {
    size?: ContainerProps['size']
    padding?: ContainerProps['padding']
  }
>(({ size = 'xl', padding = 'lg', ...props }, ref) => (
  <Container ref={ref} size={size} padding={padding} {...props} />
))

PageContainer.displayName = 'PageContainer'

export const ContentContainer = forwardRef<
  HTMLElement,
  Omit<ContainerProps, 'size' | 'padding'> & {
    size?: ContainerProps['size']
    padding?: ContainerProps['padding']
  }
>(({ size = 'lg', padding = 'md', ...props }, ref) => (
  <Container ref={ref} size={size} padding={padding} {...props} />
))

ContentContainer.displayName = 'ContentContainer'

export const SectionContainer = forwardRef<
  HTMLElement,
  Omit<ContainerProps, 'size' | 'padding' | 'as'> & {
    size?: ContainerProps['size']
    padding?: ContainerProps['padding']
  }
>(({ size = 'lg', padding = 'lg', ...props }, ref) => (
  <Container ref={ref} as="section" size={size} padding={padding} {...props} />
))

SectionContainer.displayName = 'SectionContainer'

export const HeroContainer = forwardRef<
  HTMLElement,
  Omit<ContainerProps, 'size' | 'padding'> & {
    size?: ContainerProps['size']
    padding?: ContainerProps['padding']
  }
>(({ size = 'xl', padding = 'xl', ...props }, ref) => (
  <Container ref={ref} size={size} padding={padding} {...props} />
))

HeroContainer.displayName = 'HeroContainer'

// Grid container for layout systems
export const GridContainer = forwardRef<
  HTMLDivElement,
  ContainerProps & {
    cols?: 1 | 2 | 3 | 4 | 6 | 12
    gap?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ cols = 12, gap = 'md', className, ...props }, ref) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-12',
  }

  const gridGap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  return (
    <Container
      ref={ref}
      className={cn(
        'grid',
        gridCols[cols],
        gridGap[gap],
        className
      )}
      {...props}
    />
  )
})

GridContainer.displayName = 'GridContainer'

// Flex container for flexbox layouts
export const FlexContainer = forwardRef<
  HTMLDivElement,
  ContainerProps & {
    direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    wrap?: boolean
    gap?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ 
  direction = 'row', 
  align = 'start', 
  justify = 'start', 
  wrap = false,
  gap = 'md',
  className, 
  ...props 
}, ref) => {
  const flexDirection = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  }

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyContent = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const flexGap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  return (
    <Container
      ref={ref}
      className={cn(
        'flex',
        flexDirection[direction],
        alignItems[align],
        justifyContent[justify],
        wrap && 'flex-wrap',
        flexGap[gap],
        className
      )}
      {...props}
    />
  )
})

FlexContainer.displayName = 'FlexContainer'

// Stack container for vertical layouts with consistent spacing
export const StackContainer = forwardRef<
  HTMLDivElement,
  ContainerProps & {
    space?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    align?: 'start' | 'center' | 'end' | 'stretch'
  }
>(({ space = 'md', align = 'stretch', className, ...props }, ref) => {
  const stackSpace = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
    '2xl': 'space-y-16',
  }

  const alignItems = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  return (
    <Container
      ref={ref}
      className={cn(
        'flex flex-col',
        stackSpace[space],
        alignItems[align],
        className
      )}
      {...props}
    />
  )
})

StackContainer.displayName = 'StackContainer'

// Utility type for container size
export type ContainerSize = keyof typeof containerSizes

// Export the size and padding configurations for use in other components
export { containerSizes, containerPadding }
import { cn } from '@/lib/utils/cn'

interface StackProps {
  children: React.ReactNode
  direction?: 'row' | 'column'
  spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12 | 16 | 20
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const directionMap = {
  row: 'flex-row',
  column: 'flex-col',
} as const

const spacingMap = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
} as const

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const

export function Stack({
  children,
  direction = 'column',
  spacing = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  as: Component = 'div'
}: StackProps) {
  return (
    <Component
      className={cn(
        'flex',
        directionMap[direction],
        spacingMap[spacing],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </Component>
  )
}
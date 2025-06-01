import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20
  gapX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20
  gapY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20
  rows?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto' | 'min' | 'max' | 'fr'
  autoRows?: 'auto' | 'min' | 'max' | 'fr'
  flow?: 'row' | 'col' | 'row-dense' | 'col-dense'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// Column mapping for all breakpoints
const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
  10: 'grid-cols-10',
  12: 'grid-cols-12',
} as const

const colsSmMap = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  8: 'sm:grid-cols-8',
  10: 'sm:grid-cols-10',
  12: 'sm:grid-cols-12',
} as const

const colsMdMap = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  8: 'md:grid-cols-8',
  10: 'md:grid-cols-10',
  12: 'md:grid-cols-12',
} as const

const colsLgMap = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  8: 'lg:grid-cols-8',
  10: 'lg:grid-cols-10',
  12: 'lg:grid-cols-12',
} as const

const colsXlMap = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  8: 'xl:grid-cols-8',
  10: 'xl:grid-cols-10',
  12: 'xl:grid-cols-12',
} as const

// Gap mappings
const gapMap = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
} as const

const gapXMap = {
  0: 'gap-x-0',
  1: 'gap-x-1',
  2: 'gap-x-2',
  3: 'gap-x-3',
  4: 'gap-x-4',
  5: 'gap-x-5',
  6: 'gap-x-6',
  8: 'gap-x-8',
  10: 'gap-x-10',
  12: 'gap-x-12',
  16: 'gap-x-16',
  20: 'gap-x-20',
} as const

const gapYMap = {
  0: 'gap-y-0',
  1: 'gap-y-1',
  2: 'gap-y-2',
  3: 'gap-y-3',
  4: 'gap-y-4',
  5: 'gap-y-5',
  6: 'gap-y-6',
  8: 'gap-y-8',
  10: 'gap-y-10',
  12: 'gap-y-12',
  16: 'gap-y-16',
  20: 'gap-y-20',
} as const

// Row mappings
const rowsMap = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
  auto: 'grid-rows-auto',
  min: 'grid-rows-min',
  max: 'grid-rows-max',
  fr: 'grid-rows-fr',
} as const

const autoRowsMap = {
  auto: 'auto-rows-auto',
  min: 'auto-rows-min',
  max: 'auto-rows-max',
  fr: 'auto-rows-fr',
} as const

const flowMap = {
  row: 'grid-flow-row',
  col: 'grid-flow-col',
  'row-dense': 'grid-flow-row-dense',
  'col-dense': 'grid-flow-col-dense',
} as const

export const Grid = forwardRef<
  HTMLElement,
  GridProps
>(({
  children,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 4,
  gapX,
  gapY,
  rows,
  autoRows,
  flow = 'row',
  className,
  as = 'div',
  ...props
}, ref) => {
  const Component = as as React.ElementType

  return (
    <Component
      ref={ref}
      className={cn(
        'grid',
        
        // Columns for different breakpoints
        colsMap[cols],
        colsSm && colsSmMap[colsSm],
        colsMd && colsMdMap[colsMd],
        colsLg && colsLgMap[colsLg],
        colsXl && colsXlMap[colsXl],
        
        // Gap control (general gap or specific X/Y gaps)
        gapX !== undefined || gapY !== undefined 
          ? cn(
              gapX !== undefined && gapXMap[gapX],
              gapY !== undefined && gapYMap[gapY]
            )
          : gapMap[gap],
          
        // Rows
        rows && rowsMap[rows],
        autoRows && autoRowsMap[autoRows],
        
        // Flow
        flowMap[flow],
        
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

Grid.displayName = 'Grid'

// Grid item component for advanced positioning
interface GridItemProps {
  children: React.ReactNode
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full' | 'auto'
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'auto'
  colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 'auto'
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full' | 'auto'
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'auto'
  rowEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'auto'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const colSpanMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  full: 'col-span-full',
  auto: 'col-auto',
} as const

const colStartMap = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
  13: 'col-start-13',
  auto: 'col-start-auto',
} as const

const colEndMap = {
  1: 'col-end-1',
  2: 'col-end-2',
  3: 'col-end-3',
  4: 'col-end-4',
  5: 'col-end-5',
  6: 'col-end-6',
  7: 'col-end-7',
  8: 'col-end-8',
  9: 'col-end-9',
  10: 'col-end-10',
  11: 'col-end-11',
  12: 'col-end-12',
  13: 'col-end-13',
  auto: 'col-end-auto',
} as const

const rowSpanMap = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  full: 'row-span-full',
  auto: 'row-auto',
} as const

const rowStartMap = {
  1: 'row-start-1',
  2: 'row-start-2',
  3: 'row-start-3',
  4: 'row-start-4',
  5: 'row-start-5',
  6: 'row-start-6',
  7: 'row-start-7',
  auto: 'row-start-auto',
} as const

const rowEndMap = {
  1: 'row-end-1',
  2: 'row-end-2',
  3: 'row-end-3',
  4: 'row-end-4',
  5: 'row-end-5',
  6: 'row-end-6',
  7: 'row-end-7',
  auto: 'row-end-auto',
} as const

export const GridItem = forwardRef<
  HTMLElement,
  GridItemProps
>(({
  children,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
  className,
  as = 'div',
  ...props
}, ref) => {
  const Component = as as React.ElementType

  return (
    <Component
      ref={ref}
      className={cn(
        colSpan && colSpanMap[colSpan],
        colStart && colStartMap[colStart],
        colEnd && colEndMap[colEnd],
        rowSpan && rowSpanMap[rowSpan],
        rowStart && rowStartMap[rowStart],
        rowEnd && rowEndMap[rowEnd],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

GridItem.displayName = 'GridItem'

// Specialized grid components for common layouts
export const CardGrid = forwardRef<
  HTMLElement,
  Omit<GridProps, 'cols' | 'colsMd' | 'colsLg'> & {
    cardSize?: 'sm' | 'md' | 'lg'
  }
>(({ cardSize = 'md', gap = 6, ...props }, ref) => {
  const cardSizeConfig = {
    sm: { cols: 1 as const, colsSm: 2 as const, colsMd: 3 as const, colsLg: 4 as const, colsXl: 6 as const },
    md: { cols: 1 as const, colsSm: 2 as const, colsMd: 2 as const, colsLg: 3 as const, colsXl: 4 as const },
    lg: { cols: 1 as const, colsSm: 1 as const, colsMd: 2 as const, colsLg: 2 as const, colsXl: 3 as const },
  }

  return (
    <Grid
      ref={ref}
      gap={gap}
      {...cardSizeConfig[cardSize]}
      {...props}
    />
  )
})

CardGrid.displayName = 'CardGrid'

export const ImageGrid = forwardRef<
  HTMLElement,
  Omit<GridProps, 'cols' | 'colsMd' | 'colsLg'>
>(({ gap = 4, ...props }, ref) => (
  <Grid
    ref={ref}
    cols={2}
    colsSm={3}
    colsMd={4}
    colsLg={5}
    colsXl={6}
    gap={gap}
    {...props}
  />
))

ImageGrid.displayName = 'ImageGrid'

export const FeatureGrid = forwardRef<
  HTMLElement,
  Omit<GridProps, 'cols' | 'colsMd' | 'colsLg'>
>(({ gap = 8, ...props }, ref) => (
  <Grid
    ref={ref}
    cols={1}
    colsMd={2}
    colsLg={3}
    gap={gap}
    {...props}
  />
))

FeatureGrid.displayName = 'FeatureGrid'

export const MasonryGrid = forwardRef<
  HTMLElement,
  Omit<GridProps, 'flow' | 'autoRows'>
>(({ gap = 4, ...props }, ref) => (
  <Grid
    ref={ref}
    flow="row-dense"
    autoRows="min"
    gap={gap}
    {...props}
  />
))

MasonryGrid.displayName = 'MasonryGrid'

// Utility types for external use
export type GridColumns = GridProps['cols']
export type GridGap = GridProps['gap']

// Export configuration maps for external use
export {
  colsMap,
  colsMdMap,
  colsLgMap,
  gapMap,
  colSpanMap,
  rowSpanMap,
} 
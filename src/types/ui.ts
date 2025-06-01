import type { HTMLMotionProps } from 'framer-motion'
import type { ThemeName } from '@/lib/themes'

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Button component types
export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

// Card component types
export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  className?: string
}

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

// Badge component types
export interface BadgeProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  className?: string
}

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

// Typography component types
export interface TypographyProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'foreground'
  align?: 'left' | 'center' | 'right'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
export type TypographyColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'foreground'
export type TypographyAlign = 'left' | 'center' | 'right'
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

// Form component types
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

// Modal component types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
  overlayClassName?: string
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Tooltip component types
export interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
  contentClassName?: string
}

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

// Dropdown component types
export interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  offset?: number
  className?: string
  contentClassName?: string
}

// Avatar component types
export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
  className?: string
}

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarShape = 'circle' | 'square'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

// Theme component types
export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'button' | 'select' | 'grid'
  showLabel?: boolean
  className?: string
}

export interface ThemeContextType {
  currentTheme: ThemeName
  setTheme: (theme: ThemeName) => void
  isTransitioning: boolean
  nextTheme: () => void
  previousTheme: () => void
  randomTheme: () => void
}

// Color system types
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'muted'

export interface ColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

// Icon component types
export interface IconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: ColorVariant
  className?: string
}

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Status component types
export interface StatusProps {
  variant: 'success' | 'warning' | 'error' | 'info'
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export type StatusVariant = 'success' | 'warning' | 'error' | 'info'

// Navigation component types
export interface NavItemProps {
  href?: string
  isActive?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
    isActive?: boolean
  }>
  separator?: React.ReactNode
  className?: string
}

// Table component types
export interface TableColumn<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right'
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
  className?: string
  rowClassName?: (record: T, index: number) => string
  onRowClick?: (record: T, index: number) => void
}

// Pagination component types
export interface PaginationProps {
  current: number
  total: number
  pageSize?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  onChange: (page: number, pageSize?: number) => void
  className?: string
}

// Loading component types
export interface SkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'rectangular' | 'circular'
  animation?: 'pulse' | 'wave' | false
  className?: string
}

export type SkeletonVariant = 'text' | 'rectangular' | 'circular'
export type SkeletonAnimation = 'pulse' | 'wave' | false

// Dialog component types
export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  actions?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Tabs component types
export interface TabItem {
  key: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultActiveKey?: string
  activeKey?: string
  onChange?: (key: string) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'line' | 'card' | 'pill'
  className?: string
}

export type TabVariant = 'line' | 'card' | 'pill'

// Accordion component types
export interface AccordionItem {
  key: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpenKeys?: string[]
  openKeys?: string[]
  onChange?: (keys: string[]) => void
  allowMultiple?: boolean
  className?: string
}

// Slider component types
export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  marks?: Record<number, string>
  onChange?: (value: number) => void
  onAfterChange?: (value: number) => void
  disabled?: boolean
  className?: string
}

// Switch component types
export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  description?: string
  className?: string
}

// Checkbox component types
export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  description?: string
  className?: string
}

// Radio component types
export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
  description?: string
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
  className?: string
}

// Date picker component types
export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | null) => void
  format?: string
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  className?: string
}

// Component state types
export interface ComponentState {
  loading: boolean
  error: string | null
  disabled: boolean
  focused: boolean
  hovered: boolean
  pressed: boolean
}

// Responsive design types
export interface ResponsiveProps<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

// Accessibility types
export interface AccessibilityProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-controls'?: string
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  role?: string
  tabIndex?: number
}

// Event handler types
export interface ComponentEventHandlers {
  onClick?: (event: React.MouseEvent) => void
  onMouseEnter?: (event: React.MouseEvent) => void
  onMouseLeave?: (event: React.MouseEvent) => void
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onKeyUp?: (event: React.KeyboardEvent) => void
}

// Utility types
export type PropsWithClassName<T = {}> = T & { className?: string }
export type PropsWithChildren<T = {}> = T & { children?: React.ReactNode }
export type PropsWithRef<T = {}, R = HTMLElement> = T & { ref?: React.Ref<R> }

// Form validation types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

export interface FormFieldState {
  value: any
  error: string | null
  touched: boolean
  dirty: boolean
}

// Theme-aware component types
export interface ThemeAwareProps {
  themeColor?: ColorVariant
  themeScale?: ColorScale
}
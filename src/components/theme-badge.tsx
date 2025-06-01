import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useThemeCSS, useThemeInfo } from '@/hooks/useTheme'

export function ThemeBadge() {
  const { getCSSColorProperty } = useThemeCSS()
  const { name: themeName } = useThemeInfo()

  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
      style={{
        backgroundColor: getCSSColorProperty('background', 0.1),
        borderColor: getCSSColorProperty('border', 0.2),
        color: getCSSColorProperty('foreground')
      }}
      whileHover={{ scale: 1.05 }}
    >
      <Zap className="w-4 h-4" />
      <span className="text-sm font-medium">
        Meet Our Development Team ({themeName})
      </span>
    </motion.div>
  )
}
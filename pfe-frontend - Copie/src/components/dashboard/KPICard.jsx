import { motion } from 'framer-motion'
import { icons } from '../../data/icons'
import { useTheme } from '../ThemeContext'

const lightColors = {
  primary: 'from-primary-100 to-primary-50 border-primary-200 text-primary-600',
  accent: 'from-accent-100 to-accent-50 border-accent-200 text-accent-600',
  blue: 'from-blue-100 to-blue-50 border-blue-200 text-blue-600',
  yellow: 'from-amber-100 to-amber-50 border-amber-200 text-amber-600',
}

const darkColors = {
  primary: 'from-primary-500/20 to-primary-600/10 border-primary-500/20 text-primary-400',
  accent: 'from-accent-500/20 to-accent-600/10 border-accent-500/20 text-accent-400',
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',
  yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/20 text-yellow-400',
}

const iconMap = {
  dumbbell: icons.dumbbell,
  flame: icons.flame,
  clock: icons.clock,
  zap: icons.zap,
}

export default function KPICard({ data, index = 0 }) {
  const { theme } = useTheme()
  const colors = theme === 'dark' ? darkColors : lightColors
  const colorClass = colors[data.color] || colors.primary

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="kpi-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} border flex items-center justify-center`}>
          {iconMap[data.icon] || icons.dumbbell}
        </div>
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-500/10 px-2 py-0.5 rounded-full">
          {icons.trendingUp}
          {data.change}
        </span>
      </div>
      <p className="text-2xl font-bold text-surface-900 dark:text-white mb-0.5">{data.value}</p>
      <p className="text-sm text-surface-500 dark:text-surface-400">{data.label}</p>
    </motion.div>
  )
}

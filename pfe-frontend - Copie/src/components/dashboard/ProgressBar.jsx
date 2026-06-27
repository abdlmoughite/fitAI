import { motion } from 'framer-motion'

export default function ProgressBar({ value, max, label, showPercent = true, size = 'md', color = 'primary' }) {
  const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0
  const sizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }
  const colors = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    yellow: 'bg-yellow-500',
    gradient: 'bg-gradient-to-r from-primary-500 to-accent-500',
  }

  return (
    <div className="space-y-1">
      {(label || showPercent) && (
        <div className="flex justify-between text-xs">
          {label && <span className="text-surface-600 dark:text-surface-300">{label}</span>}
          {showPercent && <span className="text-surface-500 dark:text-surface-400">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#E2E8F0] dark:bg-surface-700/50 rounded-full overflow-hidden ${sizes[size] || sizes.md}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color] || colors.primary}`}
        />
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'

export default function ChartCard({ title, subtitle, children, className = '', height = 'h-48', action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-5 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{title}</h3>
          {subtitle && <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className={`${height} flex items-end justify-between gap-1`}>
        {children}
      </div>
    </motion.div>
  )
}

export function BarChart({ data = [], color = 'bg-primary-500', height = 48, maxValue, labelKey = 'label', valueKey = 'value', showLabels = true }) {
  const max = maxValue || Math.max(...data.map(d => d[valueKey]), 1)

  return (
    <div className="flex items-end justify-between gap-1.5 w-full h-full">
      {data.map((item, i) => {
        const h = (item[valueKey] / max) * 100
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
            <div className="relative w-full flex justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                className={`w-full max-w-[32px] ${color} rounded-lg ${h > 5 ? 'min-h-[6px]' : ''} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                style={{ height: `${h}%` }}
              />
            </div>
            {showLabels && (
              <span className="text-[10px] text-surface-500 dark:text-surface-400 text-center whitespace-nowrap">{item[labelKey]}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function ProgressChart({ data = [], labelKey = 'label', valueKey = 'current', maxKey = 'target', nameKey = 'exercise' }) {
  return (
    <div className="space-y-3 w-full">
      {data.map((item, i) => {
        const pct = Math.min((item[valueKey] / item[maxKey]) * 100, 100)
        return (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-surface-600 dark:text-surface-300">{item[nameKey] || item[labelKey]}</span>
              <span className="text-surface-500 dark:text-surface-400">{item[valueKey]}/{item[maxKey]} kg</span>
            </div>
            <div className="h-2 bg-[#E2E8F0] dark:bg-surface-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`h-full rounded-full ${pct > 80 ? 'bg-accent-500' : pct > 50 ? 'bg-primary-500' : 'bg-yellow-500'}`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

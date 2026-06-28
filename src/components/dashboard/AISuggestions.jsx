import { motion } from 'framer-motion'
import { aiSuggestions } from '../../data/mockData'
import Badge from '../ui/Badge'

const typeConfig = {
  tip: { icon: '💡', label: 'Conseil', variant: 'primary' },
  workout: { icon: '🏋️', label: 'Entraînement', variant: 'accent' },
  warning: { icon: '⚠️', label: 'Attention', variant: 'warning' },
}

export default function AISuggestions() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-500/15 flex items-center justify-center text-accent-600 dark:text-accent-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4a4 4 0 0 1 3.5 2"/><path d="M12 20a4 4 0 0 1-3.5-2"/><path d="M12 2v2"/><path d="M12 20v2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="12" r="2"/><path d="M10 16h4"/></svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Suggestions IA</h3>
          <p className="text-xs text-surface-500 dark:text-surface-400">Basé sur tes performances</p>
        </div>
      </div>
      <div className="space-y-3">
        {aiSuggestions.map((s, i) => {
          const config = typeConfig[s.type] || typeConfig.tip
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-surface-800/40 border border-[#E2E8F0] dark:border-surface-700/30 hover:bg-[#F1F5F9] dark:hover:bg-surface-800/60 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-base flex-shrink-0 mt-0.5">{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-surface-900 dark:text-white">{s.title}</h4>
                    <Badge variant={config.variant} size="sm">{config.label}</Badge>
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

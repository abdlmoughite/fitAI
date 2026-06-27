import { motion } from 'framer-motion'
import Button from './Button'

export default function EmptyState({ icon, title, description, action, actionLabel, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] dark:bg-surface-800/60 flex items-center justify-center text-surface-500 dark:text-surface-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm mb-6">{description}</p>}
      {action && (
        <Button variant="primary" onClick={action}>
          {actionLabel || 'Commencer'}
        </Button>
      )}
    </motion.div>
  )
}

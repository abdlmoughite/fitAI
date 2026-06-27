import { motion, AnimatePresence } from 'framer-motion'
import { icons } from '../../data/icons'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={`relative w-full ${sizes[size] || sizes.md} bg-white dark:bg-surface-850 border border-[#E2E8F0] dark:border-surface-700 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin`}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] dark:border-surface-700">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white">{title}</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-[#F1F5F9] dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-700/50 transition-colors">
                {icons.x}
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

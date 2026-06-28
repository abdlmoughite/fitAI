import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

export default function ChatBubble({ message }) {
  const { user } = useAuth()
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isUser ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400' : 'bg-accent-50 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400'}`}>
        {isUser ? user?.initials || 'U' : 'AI'}
      </div>
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary-500 text-white rounded-tr-md'
            : 'bg-white dark:bg-surface-800/60 border border-[#E2E8F0] dark:border-surface-700/50 text-surface-700 dark:text-surface-200 rounded-tl-md'
        }`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
        <span className="text-[10px] text-surface-400 dark:text-surface-500 mt-1 px-1">{message.timestamp}</span>
      </div>
    </motion.div>
  )
}

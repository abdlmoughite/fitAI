import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, padding = true, glow = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`glass-card ${padding ? 'p-5' : ''} ${glow ? 'shadow-primary-500/5 border-primary-500/20' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

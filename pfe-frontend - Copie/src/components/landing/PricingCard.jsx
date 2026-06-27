import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { icons } from '../../data/icons'

export default function PricingCard({ plan, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative glass-card p-6 sm:p-8 ${plan.popular ? 'border-primary-500/40 shadow-primary-500/10 shadow-2xl' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white dark:text-white text-xs font-semibold shadow-lg">
          Le plus populaire
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-1 dark:text-white">{plan.name}</h3>
        <p className="text-sm text-surface-500 dark:text-surface-400">{plan.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold text-surface-900 dark:text-white">{plan.price}</span>
        {plan.period && <span className="text-surface-500 dark:text-surface-400 text-sm ml-1">{plan.period}</span>}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span className="text-accent-500 mt-0.5 flex-shrink-0">{icons.check}</span>
            <span className="text-surface-600 dark:text-surface-300">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/register"
        className={`block text-center py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
          plan.popular
            ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25'
            : 'bg-white text-surface-600 hover:text-surface-800 hover:bg-[#F8FAFC] border border-[#E2E8F0] dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700 dark:border-surface-700'
        }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import { testimonials } from '../../data/mockData'
import { icons } from '../../data/icons'

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4 dark:text-white">
            Ils nous <span className="gradient-text">font confiance</span>
          </h2>
          <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
            Rejoins des milliers de sportifs qui transforment leur entraînement avec FitAI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className="text-yellow-400 text-xs">{icons.star}</span>
                ))}
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed mb-4">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

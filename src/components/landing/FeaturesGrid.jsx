import { motion } from 'framer-motion'
import { features } from '../../data/mockData'
import { icons } from '../../data/icons'

const featureIcons = {
  brain: icons.brain,
  dumbbell: icons.dumbbell,
  chart: icons.chart,
  timer: icons.timer,
  users: icons.users,
  target: icons.target,
}

export default function FeaturesGrid() {
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
            Tout ce dont tu as besoin pour <span className="gradient-text">progresser</span>
          </h2>
          <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-lg">
            Une plateforme complète qui combine IA, analytics et programmes professionnels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 hover:border-[#CBD5E1] dark:hover:border-surface-600/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {featureIcons[f.icon] || icons.zap}
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2 dark:text-white">{f.title}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

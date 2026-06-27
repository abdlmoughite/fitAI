import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 mesh-bg-hero" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4 dark:text-white">
            Prêt à transformer <span className="gradient-text">ton corps</span> ?
          </h2>
          <p className="text-lg text-surface-500 dark:text-surface-400 mb-8 max-w-xl mx-auto">
            Rejoins FitAI aujourd'hui et découvre un coach personnel qui s'adapte à toi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5">
              Commencer gratuitement
            </Link>
            <Link to="/features" className="btn-secondary text-base px-8 py-3.5">
              En savoir plus
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

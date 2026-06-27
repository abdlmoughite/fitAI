import { motion } from 'framer-motion'
import FeaturesGrid from '../../components/landing/FeaturesGrid'
import CTASection from '../../components/landing/CTASection'

export default function FeaturesPage() {
  return (
    <div className="pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
          Fonctionnalités <span className="gradient-text">FitAI</span>
        </h1>
        <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-lg">
          Découvre tout ce que notre plateforme peut faire pour toi.
        </p>
      </motion.div>
      <FeaturesGrid />
      <CTASection />
    </div>
  )
}

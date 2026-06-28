import { motion } from 'framer-motion'
import PricingCard from '../../components/landing/PricingCard'
import CTASection from '../../components/landing/CTASection'
import { pricingPlans } from '../../data/mockData'

export default function PricingPage() {
  return (
    <div className="pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
          Des tarifs <span className="gradient-text">transparents</span>
        </h1>
        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto text-lg">
          Choisis le plan qui correspond à tes objectifs. Pas de frais cachés.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

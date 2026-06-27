import { motion } from 'framer-motion'
import CTASection from '../../components/landing/CTASection'

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
            À propos de <span className="gradient-text">FitAI</span>
          </h1>
          <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-lg">
            La mission de FitAI : rendre un coaching fitness personnalisé accessible à tous grâce à l'intelligence artificielle.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-3">Notre Mission</h2>
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
              Nous croyons que chaque personne mérite un coach personnel. L'IA nous permet de démocratiser
              l'accès à un entraînement sur mesure, auparavant réservé à une élite sportive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-3">Comment ça marche</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {[
                { step: '01', title: 'Analyse', desc: "L'IA analyse ton niveau, tes objectifs et ta morphologie." },
                { step: '02', title: 'Génération', desc: 'Des programmes personnalisés sont créés pour toi en temps réel.' },
                { step: '03', title: 'Progression', desc: "Tes performances sont analysées et les programmes s'adaptent." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg shadow-lg shadow-primary-500/20">
                    {item.step}
                  </div>
                  <h3 className="text-surface-900 dark:text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-3">Notre Équipe</h2>
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
              FitAI a été fondé par une équipe passionnée de sport et de technologie.
              Ingénieurs en IA, coachs sportifs et designers UX — tous unis pour créer
              la meilleure expérience d'entraînement intelligent.
            </p>
          </motion.div>
        </div>
      </div>

      <CTASection />
    </div>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { icons } from '../../data/icons'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg-hero">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none dark:via-surface-950/50 dark:to-surface-950" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent-50 text-accent-600 border border-accent-200 dark:bg-accent-500/10 dark:text-accent-400 dark:border-accent-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            Coach IA disponible — beta ouverte
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-surface-900 leading-tight mb-6 text-balance dark:text-white"
        >
          Ton coach fitness
          <br />
          <span className="gradient-text">intelligent et personnel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto mb-8 dark:text-surface-400"
        >
          FitAI utilise l'intelligence artificielle pour créer des programmes d'entraînement sur mesure,
          analyser ta progression et t'accompagner vers tes objectifs — comme un coach personnel, mais en mieux.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/register" className="btn-primary text-base px-8 py-3.5">
            Commencer gratuitement
            {icons.chevronRight}
          </Link>
          <Link to="/features" className="btn-secondary text-base px-8 py-3.5">
            Voir les fonctionnalités
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 text-surface-500 dark:text-surface-400 text-xs dark:text-surface-500"
        >
          <span className="flex items-center gap-1.5">{icons.check} IA entraînée</span>
          <span className="flex items-center gap-1.5">{icons.check} Programmes pro</span>
          <span className="flex items-center gap-1.5">{icons.check} Analytics temps réel</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-surface-950" />
    </section>
  )
}

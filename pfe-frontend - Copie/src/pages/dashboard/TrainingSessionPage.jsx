import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timer from '../../components/dashboard/Timer'
import ProgressBar from '../../components/dashboard/ProgressBar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { trainingExercises } from '../../data/mockData'
import { icons } from '../../data/icons'

export default function TrainingSessionPage() {
  const [exercises, setExercises] = useState(trainingExercises)
  const [activeExercise, setActiveExercise] = useState(null)
  const [sessionActive, setSessionActive] = useState(false)
  const [completed, setCompleted] = useState(false)

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedSets = exercises.reduce((acc, ex) => {
    return acc + (ex.completed ? ex.sets : ex.currentSet)
  }, 0)
  const progress = Math.round((completedSets / totalSets) * 100)

  const completeSet = (id) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== id) return ex
      const nextSet = ex.currentSet + 1
      if (nextSet >= ex.sets) return { ...ex, completed: true, currentSet: ex.sets }
      return { ...ex, currentSet: nextSet }
    }))
  }

  const startSession = () => {
    setSessionActive(true)
    setActiveExercise(exercises[0].id)
  }

  const finishSession = () => {
    setSessionActive(false)
    setCompleted(true)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Session d'entraînement</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Haut du corps · Force Hypertrophie</p>
        </div>
        <Badge variant={sessionActive ? 'accent' : 'primary'} dot>{sessionActive ? 'En cours' : 'Prête'}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-surface-900 dark:text-white">Exercices</h2>
              <span className="text-xs text-surface-500 dark:text-surface-400">{completedSets}/{totalSets} séries</span>
            </div>
            <ProgressBar value={completedSets} max={totalSets} color="accent" />
          </div>

          <div className="space-y-3">
            {exercises.map((ex, i) => {
              const isActive = activeExercise === ex.id
              return (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-card p-4 transition-all duration-200 ${
                    isActive ? 'border-primary-500/30 ring-1 ring-primary-500/20' : ''
                  } ${ex.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        ex.completed ? 'bg-accent-50 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400' : isActive ? 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400' : 'bg-[#F1F5F9] dark:bg-surface-800/60 text-surface-500 dark:text-surface-400'
                      }`}>
                        {ex.completed ? icons.check : i + 1}
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${ex.completed ? 'text-surface-400 dark:text-surface-500 line-through' : 'text-surface-900 dark:text-white'}`}>
                          {ex.name}
                        </h3>
                        <p className="text-xs text-surface-500 dark:text-surface-400">
                          {ex.sets}×{ex.reps} · {ex.weight}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!ex.completed && (
                        <>
                          <span className="text-xs text-surface-500 dark:text-surface-400">
                            {ex.currentSet}/{ex.sets}
                          </span>
                          <button
                            onClick={() => { setActiveExercise(ex.id); completeSet(ex.id) }}
                            disabled={!sessionActive}
                            className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
                          >
                            {icons.check}
                          </button>
                        </>
                      )}
                      {ex.completed && (
                        <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">Terminé</span>
                      )}
                    </div>
                  </div>

                  {isActive && !ex.completed && (
                    <div className="mt-3 pt-3 border-t border-[#E2E8F0] dark:border-surface-700/30">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: ex.sets }).map((_, si) => (
                          <div
                            key={si}
                            className={`h-2 flex-1 rounded-full ${si < ex.currentSet ? 'bg-accent-500' : si === ex.currentSet ? 'bg-primary-500' : 'bg-[#E2E8F0] dark:bg-surface-700/50'}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6">
            <Timer initialSeconds={0} />
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Contrôles</h3>
            </div>
            <div className="space-y-2">
              {!sessionActive && !completed && (
                <Button variant="primary" size="lg" className="w-full" icon={icons.play} onClick={startSession}>
                  Démarrer la séance
                </Button>
              )}
              {sessionActive && (
                <Button variant="danger" size="lg" className="w-full" icon={icons.stop} onClick={finishSession}>
                  Terminer la séance
                </Button>
              )}
              {completed && (
                <div className="text-center py-4">
                  <div className="text-2xl mb-1">🎉</div>
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">Séance terminée !</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">Bravo, tu as complété {completedSets} séries.</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Résumé</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-surface-500 dark:text-surface-400">
                <span>Séries complétées</span>
                <span className="text-surface-900 dark:text-white font-medium">{completedSets}/{totalSets}</span>
              </div>
              <div className="flex justify-between text-surface-500 dark:text-surface-400">
                <span>Progression</span>
                <span className="text-accent-600 dark:text-accent-400 font-medium">{progress}%</span>
              </div>
              <div className="flex justify-between text-surface-500 dark:text-surface-400">
                <span>Exercices</span>
                <span className="text-surface-900 dark:text-white font-medium">{exercises.filter(e => e.completed).length}/{exercises.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Timer from '../../components/dashboard/Timer'
import ProgressBar from '../../components/dashboard/ProgressBar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { icons } from '../../data/icons'
import { sessionService } from '../../services/sessionService'
import { useAuth } from '../../context/AuthContext'

function buildExercises(plan) {
  if (!plan || !plan.exercises || plan.exercises.length === 0) return []
  return plan.exercises.map((ex, idx) => ({
    id: idx + 1,
    name: ex.name,
    sets: ex.sets,
    reps: ex.reps,
    weight: '0 kg',
    rest: ex.rest || '60s',
    currentSet: 0,
    completed: false,
  }))
}

export default function TrainingSessionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()

  const plan = location.state?.plan || null

  const [exercises, setExercises] = useState(() => buildExercises(plan))
  const [activeExercise, setActiveExercise] = useState(null)
  const [sessionActive, setSessionActive] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [startTimestamp, setStartTimestamp] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [finalStats, setFinalStats] = useState(null)

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedSets = exercises.reduce((acc, ex) =>
    acc + (ex.completed ? ex.sets : ex.currentSet), 0)
  const progress = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0

  const completeSet = (id) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== id) return ex
      const nextSet = ex.currentSet + 1
      if (nextSet >= ex.sets) return { ...ex, completed: true, currentSet: ex.sets }
      return { ...ex, currentSet: nextSet }
    }))
  }

  const startSession = async () => {
    if (user && plan) {
      try {
        const result = await sessionService.startSession(user.id, plan, exercises)
        setSessionId(result.sessionId)
      } catch {
        // Continue locally if API fails
      }
    }
    setSessionActive(true)
    setActiveExercise(exercises[0]?.id || null)
    setStartTimestamp(Date.now())
  }

  const finishSession = async () => {
    setSessionActive(false)
    setSaving(true)
    setSaveError('')

    const durationMinutes = startTimestamp
      ? Math.max(1, Math.round((Date.now() - startTimestamp) / 60000))
      : plan?.duration || 1
    const caloriesBurned = plan
      ? Math.round(plan.calories * (durationMinutes / (plan.duration || durationMinutes)))
      : Math.round(durationMinutes * 8)

    if (sessionId && user) {
      try {
        const result = await sessionService.completeSession(sessionId, {
          durationMinutes,
          caloriesBurned,
          exercises,
        })
        if (result.user) refreshUser(result.user)
      } catch {
        setSaveError('Impossible de sauvegarder la séance. Les données locales sont conservées.')
      }
    }

    setFinalStats({ durationMinutes, caloriesBurned, completedSets, totalSets })
    setSaving(false)
    setCompleted(true)
  }

  if (!plan && exercises.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-12 text-center space-y-4">
          <div className="text-4xl">🏋️</div>
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Aucune séance sélectionnée</h2>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Génère d'abord un programme depuis le Générateur de séances.
          </p>
          <Button variant="primary" onClick={() => navigate('/dashboard/workout-generator')}>
            Aller au générateur
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            {plan?.name || "Session d'entraînement"}
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {plan ? `${plan.type} · ${plan.level} · ${plan.duration} min` : 'Entraînement personnalisé'}
          </p>
        </div>
        <Badge variant={sessionActive ? 'accent' : completed ? 'success' : 'primary'} dot>
          {sessionActive ? 'En cours' : completed ? 'Terminée' : 'Prête'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercises list */}
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
                        ex.completed
                          ? 'bg-accent-50 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400'
                          : isActive
                            ? 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'
                            : 'bg-[#F1F5F9] dark:bg-surface-800/60 text-surface-500 dark:text-surface-400'
                      }`}>
                        {ex.completed ? icons.check : i + 1}
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${
                          ex.completed
                            ? 'text-surface-400 dark:text-surface-500 line-through'
                            : 'text-surface-900 dark:text-white'
                        }`}>
                          {ex.name}
                        </h3>
                        <p className="text-xs text-surface-500 dark:text-surface-400">
                          {ex.sets} × {ex.reps} · repos {ex.rest}
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
                        <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">Terminé ✓</span>
                      )}
                    </div>
                  </div>

                  {isActive && !ex.completed && (
                    <div className="mt-3 pt-3 border-t border-[#E2E8F0] dark:border-surface-700/30">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: ex.sets }).map((_, si) => (
                          <div
                            key={si}
                            className={`h-2 flex-1 rounded-full ${
                              si < ex.currentSet
                                ? 'bg-accent-500'
                                : si === ex.currentSet
                                  ? 'bg-primary-500'
                                  : 'bg-[#E2E8F0] dark:bg-surface-700/50'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-surface-400 dark:text-surface-500 mt-2">
                        Repos recommandé : {ex.rest}
                      </p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <Timer initialSeconds={0} />
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Contrôles</h3>
            <div className="space-y-2">
              {!sessionActive && !completed && (
                <Button variant="primary" size="lg" className="w-full" icon={icons.play} onClick={startSession}>
                  Démarrer la séance
                </Button>
              )}
              {sessionActive && (
                <Button variant="danger" size="lg" className="w-full" icon={icons.stop} onClick={finishSession} loading={saving}>
                  Terminer la séance
                </Button>
              )}
              {completed && !saving && (
                <div className="text-center py-4 space-y-3">
                  <div className="text-3xl">🎉</div>
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">Séance terminée !</p>
                  {finalStats && (
                    <div className="text-xs text-surface-500 dark:text-surface-400 space-y-1">
                      <p>{finalStats.durationMinutes} min · {finalStats.caloriesBurned} kcal</p>
                      <p>{finalStats.completedSets}/{finalStats.totalSets} séries complétées</p>
                    </div>
                  )}
                  {saveError && (
                    <p className="text-xs text-red-500 dark:text-red-400">{saveError}</p>
                  )}
                  <Button variant="primary" size="sm" className="w-full" onClick={() => navigate('/dashboard/workout-generator')}>
                    Nouvelle séance
                  </Button>
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
                <span className="text-surface-900 dark:text-white font-medium">
                  {exercises.filter(e => e.completed).length}/{exercises.length}
                </span>
              </div>
              {plan && (
                <div className="flex justify-between text-surface-500 dark:text-surface-400">
                  <span>Calories prévues</span>
                  <span className="text-surface-900 dark:text-white font-medium">{plan.calories} kcal</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

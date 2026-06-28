import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WorkoutCard from '../../components/dashboard/WorkoutCard'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { icons } from '../../data/icons'
import { workoutService } from '../../services/workoutService'
import { useAuth } from '../../context/AuthContext'

export default function WorkoutGeneratorPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('')
  const [time, setTime] = useState('')
  const [generated, setGenerated] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [savedPlans, setSavedPlans] = useState([])
  const [savingId, setSavingId] = useState(null)
  const [savedIds, setSavedIds] = useState(new Set())
  const [tab, setTab] = useState('generate') // 'generate' | 'saved'

  const goals = [
    { id: 'muscle', label: 'Prise de masse', icon: '💪' },
    { id: 'strength', label: 'Force', icon: '🏋️' },
    { id: 'endurance', label: 'Endurance', icon: '🏃' },
    { id: 'weight-loss', label: 'Perte de poids', icon: '🔥' },
  ]
  const levels = [
    { id: 'beginner', label: 'Débutant' },
    { id: 'intermediate', label: 'Intermédiaire' },
    { id: 'advanced', label: 'Avancé' },
  ]
  const times = [
    { id: '30', label: '30 min', desc: 'Express' },
    { id: '45', label: '45 min', desc: 'Standard' },
    { id: '60', label: '60 min', desc: 'Complet' },
  ]

  useEffect(() => {
    if (user?.id) loadSavedPlans()
  }, [user?.id])

  const loadSavedPlans = async () => {
    try {
      const plans = await workoutService.getSavedPlans(user.id)
      setSavedPlans(plans)
    } catch {}
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const plans = await workoutService.generate(goal, level, parseInt(time))
      setGenerated(plans)
      setSavedIds(new Set())
    } catch {
      setError('Impossible de générer le programme. Vérifie que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (plan) => {
    if (!user?.id || savingId === plan.id) return
    setSavingId(plan.id)
    try {
      await workoutService.savePlan(user.id, { ...plan, goal })
      setSavedIds(prev => new Set([...prev, plan.id]))
      await loadSavedPlans()
    } catch {}
    setSavingId(null)
  }

  const handleDeleteSaved = async (planId) => {
    try {
      await workoutService.deleteSavedPlan(planId, user.id)
      setSavedPlans(prev => prev.filter(p => p.id !== planId))
    } catch {}
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Générateur de séances</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Configure tes préférences pour générer un programme sur mesure.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTab('generate')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === 'generate' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-surface-800/40 text-surface-500 dark:text-surface-400 border border-[#E2E8F0] dark:border-surface-700/30'}`}
          >
            Générer
          </button>
          <button
            onClick={() => setTab('saved')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${tab === 'saved' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-surface-800/40 text-surface-500 dark:text-surface-400 border border-[#E2E8F0] dark:border-surface-700/30'}`}
          >
            Sauvegardés
            {savedPlans.length > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'saved' ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'}`}>
                {savedPlans.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {tab === 'generate' && (
        <>
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Objectif</label>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map(g => (
                    <button key={g.id} onClick={() => setGoal(g.id)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 border ${goal === g.id ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-surface-800/40 border-[#E2E8F0] dark:border-surface-700/30 text-surface-500 dark:text-surface-400 hover:border-[#CBD5E1] dark:hover:border-surface-600'}`}
                    >
                      <span className="block text-lg mb-1">{g.icon}</span>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Niveau</label>
                <div className="flex flex-col gap-2">
                  {levels.map(l => (
                    <button key={l.id} onClick={() => setLevel(l.id)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 border ${level === l.id ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-surface-800/40 border-[#E2E8F0] dark:border-surface-700/30 text-surface-500 dark:text-surface-400 hover:border-[#CBD5E1] dark:hover:border-surface-600'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Durée</label>
                <div className="flex flex-col gap-2">
                  {times.map(t => (
                    <button key={t.id} onClick={() => setTime(t.id)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 border ${time === t.id ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-600 dark:text-primary-400' : 'bg-white dark:bg-surface-800/40 border-[#E2E8F0] dark:border-surface-700/30 text-surface-500 dark:text-surface-400 hover:border-[#CBD5E1] dark:hover:border-surface-600'}`}
                    >
                      <span className="block">{t.label}</span>
                      <span className="block text-xs text-surface-500 dark:text-surface-400">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-surface-700/50">
              <Button variant="primary" size="lg" onClick={handleGenerate} loading={loading} disabled={!goal || !level || !time} icon={icons.zap} className="w-full md:w-auto">
                Générer mon programme
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="glass-card p-5 animate-pulse">
                    <div className="h-5 bg-[#E2E8F0] dark:bg-surface-700/50 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-[#E2E8F0] dark:bg-surface-700/30 rounded w-1/2 mb-4" />
                    <div className="space-y-2 mb-4">{[1,2,3].map(j => <div key={j} className="h-3 bg-[#E2E8F0] dark:bg-surface-700/30 rounded w-full" />)}</div>
                    <div className="h-9 bg-[#E2E8F0] dark:bg-surface-700/50 rounded-xl" />
                  </div>
                ))}
              </div>
            )}

            {generated && !loading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Programmes générés</h2>
                  <Badge variant="accent">{generated.length} programmes</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generated.map((w, i) => (
                    <div key={w.id} className="relative">
                      <WorkoutCard workout={w} index={i} onSelect={() => navigate('/dashboard/training', { state: { plan: w } })} />
                      <button
                        onClick={() => handleSave(w)}
                        disabled={savingId === w.id || savedIds.has(w.id)}
                        className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-lg font-medium transition-all ${
                          savedIds.has(w.id)
                            ? 'bg-accent-100 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400'
                            : 'bg-white/80 dark:bg-surface-800/80 text-surface-500 dark:text-surface-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 border border-[#E2E8F0] dark:border-surface-700/30'
                        } disabled:opacity-50`}
                      >
                        {savedIds.has(w.id) ? '✓ Sauvegardé' : savingId === w.id ? '...' : '🔖 Sauvegarder'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!generated && !loading && (
            <div className="text-center py-12 text-surface-500 dark:text-surface-400 text-sm">
              Sélectionne tes préférences et clique sur "Générer mon programme" pour commencer.
            </div>
          )}
        </>
      )}

      {tab === 'saved' && (
        <div>
          {savedPlans.length === 0 ? (
            <div className="text-center py-16 text-surface-500 dark:text-surface-400 text-sm space-y-2">
              <div className="text-3xl">🔖</div>
              <p>Aucun programme sauvegardé.</p>
              <p>Génère un programme et clique sur "Sauvegarder" pour le retrouver ici.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPlans.map((w, i) => (
                <div key={w.id} className="relative">
                  <WorkoutCard workout={w} index={i} onSelect={() => navigate('/dashboard/training', { state: { plan: w } })} />
                  <button
                    onClick={() => handleDeleteSaved(w.id)}
                    className="absolute top-3 right-3 text-xs px-2 py-1 rounded-lg font-medium bg-white/80 dark:bg-surface-800/80 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-[#E2E8F0] dark:border-surface-700/30 transition-all"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

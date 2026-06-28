import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChartCard, { BarChart } from '../../components/dashboard/ChartCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'
import { userService } from '../../services/userService'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E2E8F0] dark:bg-surface-700/50 rounded-xl ${className}`} />
}

export default function AnalyticsPage() {
  const { user } = useAuth()

  const [weekly, setWeekly] = useState(null)
  const [monthly, setMonthly] = useState(null)
  const [performance, setPerformance] = useState([])
  const [muscles, setMuscles] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    setLoading(true)
    Promise.all([
      userService.getWeeklySummary(user.id),
      userService.getMonthlyProgress(user.id),
      userService.getPerformanceByExercise(user.id),
      userService.getMuscleDistribution(user.id),
      userService.getWorkoutHistory(user.id),
    ])
      .then(([w, m, perf, mus, hist]) => {
        setWeekly(w)
        setMonthly(m)
        setPerformance(perf || [])
        setMuscles(mus || [])
        setHistory(hist || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.id])

  const weeklyChartData = weekly?.daily?.map(d => ({ label: d.day, value: d.calories })) || []
  const monthlyChartData = (monthly?.months || []).map((m, i) => ({
    label: m,
    value: (monthly.workouts || [])[i] ?? 0,
  }))

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Analytiques</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Suis ta progression dans les moindres détails.</p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Calories Hebdomadaires" subtitle="Dépense calorique — 7 derniers jours" height="h-52">
          {loading ? <Skeleton className="h-full" /> : weeklyChartData.length > 0 ? (
            <BarChart data={weeklyChartData} color="bg-gradient-to-t from-accent-500 to-accent-400" />
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-surface-400 dark:text-surface-500">
              Complète une séance pour voir tes données
            </div>
          )}
        </ChartCard>

        <ChartCard title="Entraînements Mensuels" subtitle="Séances par mois — 6 derniers mois" height="h-52">
          {loading ? <Skeleton className="h-full" /> : monthlyChartData.length > 0 ? (
            <BarChart data={monthlyChartData} color="bg-gradient-to-t from-primary-500 to-primary-400" />
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-surface-400 dark:text-surface-500">
              Aucune donnée disponible
            </div>
          )}
        </ChartCard>
      </div>

      {/* Performance + Muscle distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Performance par exercice</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">Taux de complétion des séries</p>
            </div>
            <Badge variant="accent" dot>Réel</Badge>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-8" />)}</div>
          ) : performance.length === 0 ? (
            <p className="text-sm text-surface-400 dark:text-surface-500 py-4 text-center">
              Complète des séances pour voir tes performances
            </p>
          ) : (
            <div className="space-y-3">
              {performance.map((p, i) => (
                <motion.div
                  key={p.exercise}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-300 truncate max-w-[60%]">{p.exercise}</span>
                    <span className="text-surface-500 dark:text-surface-400">
                      {p.completedSets}/{p.plannedSets} séries · <span className="text-accent-600 dark:text-accent-400">{p.completionRate}%</span>
                    </span>
                  </div>
                  <div className="h-2 bg-[#E2E8F0] dark:bg-surface-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.completionRate}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full rounded-full bg-accent-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Répartition musculaire</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">Volume d'entraînement par groupe</p>
            </div>
            <Badge>Volume</Badge>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3,4].map(i => <Skeleton key={i} className="h-8" />)}</div>
          ) : muscles.every(m => m.value === 0) ? (
            <p className="text-sm text-surface-400 dark:text-surface-500 py-4 text-center">
              Complète des séances pour voir la répartition
            </p>
          ) : (
            <div className="space-y-3">
              {muscles.filter(m => m.value > 0).map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-300">{m.label}</span>
                    <span className="text-surface-500 dark:text-surface-400">{m.value}%</span>
                  </div>
                  <div className="h-2.5 bg-[#E2E8F0] dark:bg-surface-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className={`h-full rounded-full ${m.value > 20 ? 'bg-accent-500' : m.value > 15 ? 'bg-primary-500' : 'bg-yellow-500'}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Workout history */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Historique des séances</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">Toutes tes séances complétées</p>
          </div>
          {history.length > 0 && <Badge variant="primary">{history.length} séances</Badge>}
        </div>
        {loading ? (
          <div className="space-y-2">{[1,2,3].map(i => <Skeleton key={i} className="h-12" />)}</div>
        ) : history.length === 0 ? (
          <p className="text-sm text-surface-400 dark:text-surface-500 py-6 text-center">
            Aucune séance enregistrée — démarre ta première séance !
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Programme</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Durée</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Calories</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Exercices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
                {history.map((row) => (
                  <tr key={row.id} className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-surface-900 dark:text-white">{row.name}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.durationMinutes} min</td>
                    <td className="px-4 py-3 text-accent-600 dark:text-accent-400">{row.caloriesBurned} kcal</td>
                    <td className="px-4 py-3">{row.exercisesCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

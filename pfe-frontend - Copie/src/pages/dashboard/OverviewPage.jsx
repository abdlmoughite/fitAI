import { motion } from 'framer-motion'
import KPICard from '../../components/dashboard/KPICard'
import ChartCard, { BarChart } from '../../components/dashboard/ChartCard'
import AISuggestions from '../../components/dashboard/AISuggestions'
import { weeklySummary, monthlyProgress } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../context/AuthContext'

export default function OverviewPage() {
  const { user } = useAuth()
  const stats = user?.stats || {}

  const kpiData = [
    { id: '1', label: 'Entraînements', value: String(stats.totalWorkouts ?? 0), change: '+12%', icon: 'dumbbell', color: 'primary' },
    { id: '2', label: 'Calories brûlées', value: String(stats.totalWorkouts ? stats.totalWorkouts * 320 : 0), change: '+8%', icon: 'flame', color: 'accent' },
    { id: '3', label: 'Minutes actives', value: String(stats.totalMinutes ?? 0), change: '+15%', icon: 'clock', color: 'blue' },
    { id: '4', label: 'Série actuelle', value: `${stats.currentStreak ?? 0} jours`, change: `+${stats.currentStreak ?? 0}`, icon: 'zap', color: 'yellow' },
  ]

  const firstName = user?.name?.split(' ')[0] || 'toi'

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Vue d'ensemble</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Bienvenue, {firstName} — voici ton résumé de la semaine.</p>
        </div>
        <Badge variant="accent" dot>Aujourd'hui · Continue ton effort !</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <KPICard key={kpi.id} data={kpi} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Activité Hebdomadaire"
            subtitle="Nombre d'entraînements et calories par jour"
            height="h-52"
          >
            <BarChart
              data={weeklySummary.map(d => ({ label: d.day, value: d.calories }))}
              color="bg-gradient-to-t from-primary-500 to-primary-400"
              labelKey="label"
              valueKey="value"
            />
          </ChartCard>

          <ChartCard
            title="Progression Mensuelle"
            subtitle="Volume d'entraînement sur 6 mois"
            height="h-44"
          >
            <BarChart
              data={monthlyProgress.map(d => ({ label: d.month, value: d.workouts }))}
              color="bg-gradient-to-t from-accent-500 to-accent-400"
              labelKey="label"
              valueKey="value"
            />
          </ChartCard>
        </div>

        <div className="space-y-6">
          <AISuggestions />

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Série en cours</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">{stats.currentStreak ?? 0}</div>
                <p className="text-xs text-surface-500 dark:text-surface-400">jours consécutifs</p>
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{stats.bestStreak ?? 0}</div>
                <p className="text-xs text-surface-500 dark:text-surface-400">record personnel</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-[#E2E8F0] dark:bg-surface-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.bestStreak ? (stats.currentStreak / stats.bestStreak) * 100 : 0}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

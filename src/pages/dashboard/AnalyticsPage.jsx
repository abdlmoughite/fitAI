import { motion } from 'framer-motion'
import ChartCard, { BarChart, ProgressChart } from '../../components/dashboard/ChartCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { analyticsData } from '../../data/mockData'
import { icons } from '../../data/icons'

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Analytiques</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Suis ta progression dans les moindres détails.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Calories Hebdomadaires"
          subtitle="Dépense calorique quotidienne"
          height="h-52"
        >
          <BarChart
            data={analyticsData.weeklyLabels.map((l, i) => ({ label: l, value: analyticsData.weeklyCalories[i] }))}
            color="bg-gradient-to-t from-accent-500 to-accent-400"
          />
        </ChartCard>

        <ChartCard
          title="Entraînements Mensuels"
          subtitle="Séances par mois sur l'année"
          height="h-52"
        >
          <BarChart
            data={analyticsData.monthlyLabels.map((l, i) => ({ label: l.slice(0, 3), value: analyticsData.monthlyWorkouts[i] }))}
            color="bg-gradient-to-t from-primary-500 to-primary-400"
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Performance par exercice</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">Progression de la charge maximale</p>
            </div>
            <Badge variant="accent" dot>Forces</Badge>
          </div>
          <ProgressChart
            data={analyticsData.performanceByExercise}
            nameKey="exercise"
            valueKey="current"
            maxKey="target"
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Répartition musculaire</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">Volume d'entraînement par groupe</p>
            </div>
            <Badge>Volume</Badge>
          </div>
          <div className="space-y-3">
            {analyticsData.muscleDistribution.map((m, i) => (
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
                    className={`h-full rounded-full ${
                      m.value > 20 ? 'bg-accent-500' : m.value > 15 ? 'bg-primary-500' : 'bg-yellow-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Évolution de la composition corporelle</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">Poids · Masse musculaire · Masse grasse</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Mois</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Poids (kg)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Muscle (kg)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Masse grasse (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
              {analyticsData.bodyStats.map((row, i) => (
                <tr key={i} className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-surface-900 dark:text-white">{row.month}</td>
                  <td className="px-4 py-3">{row.weight}</td>
                  <td className="px-4 py-3">
                    <span className="text-accent-600 dark:text-accent-400">{row.muscle}</span>
                    {i > 0 && (
                      <span className="ml-1 text-[10px] text-accent-500">
                        +{(row.muscle - analyticsData.bodyStats[i-1].muscle).toFixed(1)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={row.fat < row.fat ? 'text-accent-600 dark:text-accent-400' : 'text-yellow-600 dark:text-yellow-400'}>{row.fat}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

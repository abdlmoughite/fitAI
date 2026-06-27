import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import ChartCard, { BarChart } from '../../components/dashboard/ChartCard'
import { platformKpis, systemHealth, mockUsers } from '../../data/mockData'
import { icons } from '../../data/icons'

const iconMap = { users: icons.users, flame: icons.flame, chart: icons.chart, brain: icons.brain }

export default function SuperAdminOverview() {
  const activeUsers = mockUsers.filter(u => u.status === 'active')

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Plateforme</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Vue d'ensemble de la plateforme FitAI.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent" dot>Santé : {systemHealth.status}</Badge>
          <span className="text-xs text-surface-500 dark:text-surface-400">{systemHealth.activeUsers} actifs</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformKpis.map((kpi, i) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="kpi-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {iconMap[kpi.icon] || icons.dumbbell}
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-500/10 px-2 py-0.5 rounded-full">
                {icons.trendingUp}{kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-surface-900 dark:text-white mb-0.5">{kpi.value}</p>
            <p className="text-sm text-surface-500 dark:text-surface-400">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Croissance des utilisateurs"
          subtitle="Nouveaux inscrits par mois"
          height="h-48"
        >
          <BarChart
            data={[{label:'Jan',value:180},{label:'Fév',value:220},{label:'Mar',value:310},{label:'Avr',value:280},{label:'Mai',value:360},{label:'Juin',value:420}]}
            color="bg-gradient-to-t from-primary-500 to-primary-400"
          />
        </ChartCard>

        <ChartCard
          title="Revenus mensuels (k€)"
          subtitle="Chiffre d'affaires récurrent"
          height="h-48"
        >
          <BarChart
            data={[{label:'Jan',value:28},{label:'Fév',value:32},{label:'Mar',value:38},{label:'Avr',value:35},{label:'Mai',value:44},{label:'Juin',value:48}]}
            color="bg-gradient-to-t from-accent-500 to-accent-400"
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white">État des serveurs</h3>
                <p className="text-xs text-surface-500 dark:text-surface-400">Temps de disponibilité : {systemHealth.uptime}</p>
              </div>
            </div>
            <div className="space-y-3">
              {systemHealth.servers.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#E2E8F0]/50 dark:border-surface-700/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${s.status === 'operational' ? 'bg-accent-500' : s.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    <span className="text-sm text-surface-700 dark:text-surface-300">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-400">
                    <span>{s.latency}</span>
                    <span>{s.load}</span>
                    <Badge variant={s.status === 'operational' ? 'accent' : s.status === 'degraded' ? 'warning' : 'danger'}>
                      {s.status === 'operational' ? 'OK' : s.status === 'degraded' ? 'Dégradé' : 'HS'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Utilisateurs récents</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">{activeUsers.length} actifs</p>
            </div>
          </div>
          <div className="space-y-3">
            {mockUsers.slice(0, 5).map(u => (
              <div key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{u.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{u.plan}</p>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-accent-500' : u.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'}`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Événements récents</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">Activité de la plateforme</p>
          </div>
        </div>
        <div className="space-y-2">
          {systemHealth.recentEvents.map((e, i) => (
            <div key={i} className="flex items-center gap-3 py-2 text-sm border-b border-[#E2E8F0]/50 dark:border-surface-700/30 last:border-0">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${e.type === 'deploy' ? 'bg-primary-500' : e.type === 'warning' ? 'bg-yellow-400' : e.type === 'maintenance' ? 'bg-blue-500' : 'bg-surface-400'}`} />
              <span className="text-xs text-surface-500 dark:text-surface-400 w-36 flex-shrink-0">{e.time}</span>
              <span className="text-surface-700 dark:text-surface-300">{e.message}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { supportTickets, mockUsers, adminNotifications } from '../../data/mockData'
import { icons } from '../../data/icons'

export default function AdminOverview() {
  const openTickets = supportTickets.filter(t => t.status === 'open' || t.status === 'in_progress')
  const pendingUsers = mockUsers.filter(u => u.status === 'pending')

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Support</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Tableau de bord du support client.</p>
        </div>
        <Badge variant="warning" dot>{openTickets.length} tickets ouverts</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tickets ouverts', value: openTickets.length.toString(), change: '+3', color: 'yellow' },
          { label: 'Résolus cette semaine', value: '18', change: '+5', color: 'accent' },
          { label: 'Utilisateurs total', value: mockUsers.length.toString(), change: '+2', color: 'primary' },
          { label: 'En attente', value: pendingUsers.length.toString(), change: '0', color: 'blue' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="kpi-card"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</p>
              {stat.change !== '0' && (
                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-500/10 px-2 py-0.5 rounded-full">
                  {icons.trendingUp}{stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Tickets récents</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">Les derniers tickets support</p>
            </div>
          </div>
          <div className="space-y-2">
            {supportTickets.slice(0, 4).map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] dark:bg-surface-800/30 border border-[#E2E8F0] dark:border-surface-700/30">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 dark:text-white truncate">{t.subject}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{t.user} · {t.messages} messages</p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <Badge variant={t.priority === 'high' ? 'danger' : t.priority === 'medium' ? 'warning' : 'primary'}>
                    {t.priority}
                  </Badge>
                  <Badge variant={t.status === 'open' ? 'warning' : t.status === 'in_progress' ? 'primary' : t.status === 'resolved' ? 'accent' : 'default'}>
                    {t.status === 'in_progress' ? 'En cours' : t.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Activité récente</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400">Notifications et alertes</p>
            </div>
          </div>
          <div className="space-y-2">
            {adminNotifications.filter(n => !n.read).slice(0, 4).map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-primary-50/50 dark:bg-primary-500/5 border border-primary-200 dark:border-primary-500/20">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-surface-800 dark:text-white">{n.title}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">{n.message}</p>
                  <p className="text-[10px] text-surface-400 dark:text-surface-500 mt-0.5">{n.time}</p>
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
            <p className="text-xs text-surface-500 dark:text-surface-400">Aperçu des derniers inscrits</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Entraînements</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
              {mockUsers.map(u => (
                <tr key={u.id} className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-surface-800 dark:text-white">{u.name}</td>
                  <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{u.email}</td>
                  <td className="px-4 py-3">{u.plan}</td>
                  <td className="px-4 py-3">{u.workouts}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.status === 'active' ? 'accent' : u.status === 'pending' ? 'warning' : 'danger'}>
                      {u.status === 'active' ? 'Actif' : u.status === 'pending' ? 'En attente' : 'Suspendu'}
                    </Badge>
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

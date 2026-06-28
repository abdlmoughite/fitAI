import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import api from '../../services/api'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E2E8F0] dark:bg-surface-700/50 rounded-xl ${className}`} />
}

export default function AdminOverview() {
  const [stats, setStats] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [recentTickets, setRecentTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get('/api/admin/stats'),
      api.get('/api/admin/notifications'),
      api.get('/api/user?page=0&size=8'),
      api.get('/api/tickets'),
    ])
      .then(([statsRes, notifRes, usersRes, ticketsRes]) => {
        setStats(statsRes.data)
        setNotifications(notifRes.data || [])
        setRecentUsers((usersRes.data.content || []).filter(u => u.role?.roleName === 'client'))
        setRecentTickets((ticketsRes.data || []).slice(0, 4))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const kpiData = [
    { label: 'Tickets ouverts', value: stats?.openTickets },
    { label: 'Résolus cette semaine', value: stats?.resolvedThisWeek },
    { label: 'Utilisateurs total', value: stats?.totalUsers },
    { label: 'En attente', value: stats?.pendingUsers },
  ]

  const getFullName = (u) => `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.username || '—'

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Support</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Tableau de bord du support client.</p>
        </div>
        {stats && (
          <Badge variant="warning" dot>{stats.openTickets} tickets ouverts</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="kpi-card"
          >
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-3">{stat.label}</p>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value ?? '—'}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Tickets récents</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">Les derniers tickets support</p>
          </div>
          {loading ? (
            <div className="space-y-2">{[1,2,3,4].map(i => <Skeleton key={i} className="h-12" />)}</div>
          ) : recentTickets.length === 0 ? (
            <p className="text-sm text-surface-400 dark:text-surface-500 py-4 text-center">Aucun ticket pour le moment.</p>
          ) : (
            <div className="space-y-2">
              {recentTickets.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] dark:bg-surface-800/30 border border-[#E2E8F0] dark:border-surface-700/30">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-800 dark:text-white truncate">{t.subject}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{t.userName} · {t.messageCount || 0} messages</p>
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
          )}
        </Card>

        <Card>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Activité récente</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">Notifications et alertes</p>
          </div>
          {loading ? (
            <div className="space-y-2">{[1,2,3,4].map(i => <Skeleton key={i} className="h-14" />)}</div>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-surface-400 dark:text-surface-500 py-4 text-center">Aucune notification.</p>
          ) : (
            <div className="space-y-2">
              {notifications.filter(n => !n.read).slice(0, 4).map(n => (
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
          )}
        </Card>
      </div>

      <Card>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Utilisateurs récents</h3>
          <p className="text-xs text-surface-500 dark:text-surface-400">Aperçu des derniers inscrits</p>
        </div>
        {loading ? (
          <div className="space-y-2">{[1,2,3].map(i => <Skeleton key={i} className="h-12" />)}</div>
        ) : (
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
                {recentUsers.map(u => (
                  <tr key={u.id} className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-surface-800 dark:text-white">{getFullName(u)}</td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{u.email}</td>
                    <td className="px-4 py-3">{u.plan || 'Starter'}</td>
                    <td className="px-4 py-3">{u.totalWorkouts ?? 0}</td>
                    <td className="px-4 py-3">
                      <Badge variant={u.status === 'active' ? 'accent' : u.status === 'pending' ? 'warning' : 'danger'}>
                        {u.status === 'active' ? 'Actif' : u.status === 'pending' ? 'En attente' : 'Suspendu'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentUsers.length === 0 && (
              <p className="text-sm text-surface-400 dark:text-surface-500 py-4 text-center">Aucun utilisateur.</p>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

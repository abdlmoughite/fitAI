import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/dashboard/ProgressBar'
import api from '../../services/api'

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E2E8F0] dark:bg-surface-700/50 rounded-xl ${className}`} />
}

export default function SuperAdminSystem() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/system/health')
      .then(res => setHealth(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const kpis = health ? [
    { label: 'Temps de disponibilité', value: health.uptime, color: 'accent' },
    { label: 'Utilisateurs actifs', value: String(health.activeUsers), color: 'primary' },
    { label: 'Latence API moyenne', value: health.apiLatency, color: 'yellow' },
    { label: 'Requêtes/jour', value: '~45k', color: 'primary' },
  ] : []

  const colorClasses = {
    accent: 'text-accent-600 dark:text-accent-400',
    primary: 'text-primary-600 dark:text-primary-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Santé Système</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Surveillance de l'infrastructure FitAI.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1,2,3,4].map(i => <Skeleton key={i} className="h-24" />)
          : kpis.map((stat, i) => (
            <div key={i} className="kpi-card">
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${colorClasses[stat.color] || colorClasses.primary}`}>
                {stat.value}
              </p>
            </div>
          ))
        }
      </div>

      <Card>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white">Serveurs et Services</h3>
          <p className="text-xs text-surface-500 dark:text-surface-400">État détaillé de chaque service</p>
        </div>
        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map(i => <Skeleton key={i} className="h-14" />)}</div>
        ) : (
          <div className="space-y-4">
            {(health?.servers || []).map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] dark:bg-surface-800/30 border border-[#E2E8F0] dark:border-surface-700/30">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${s.status === 'operational' ? 'bg-accent-500' : s.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                  <div>
                    <p className="text-sm font-medium text-surface-800 dark:text-white">{s.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Latence : {s.latency} · Charge : {s.load}</p>
                  </div>
                </div>
                <Badge variant={s.status === 'operational' ? 'accent' : s.status === 'degraded' ? 'warning' : 'danger'}>
                  {s.status === 'operational' ? 'Opérationnel' : s.status === 'degraded' ? 'Dégradé' : 'Hors service'}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Charge des serveurs</h3>
          {loading ? (
            <div className="space-y-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-8" />)}</div>
          ) : (
            <div className="space-y-4">
              {(health?.servers || []).map((s, i) => {
                const loadPct = parseInt(s.load)
                return (
                  <ProgressBar
                    key={i}
                    label={s.name}
                    value={loadPct}
                    max={100}
                    showPercent
                    color={loadPct > 70 ? 'yellow' : loadPct > 50 ? 'primary' : 'accent'}
                  />
                )
              })}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Événements système</h3>
          {loading ? (
            <div className="space-y-2">{[1,2,3,4].map(i => <Skeleton key={i} className="h-8" />)}</div>
          ) : (
            <div className="space-y-2">
              {(health?.recentEvents || []).map((e, i) => (
                <div key={i} className="flex items-center gap-3 py-2 text-sm border-b border-[#E2E8F0]/50 dark:border-surface-700/30 last:border-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${e.type === 'deploy' ? 'bg-primary-500' : e.type === 'warning' ? 'bg-yellow-400' : e.type === 'maintenance' ? 'bg-blue-500' : 'bg-surface-400'}`} />
                  <span className="text-xs text-surface-500 dark:text-surface-400 w-36 flex-shrink-0">{e.time}</span>
                  <span className="text-surface-700 dark:text-surface-300">{e.message}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

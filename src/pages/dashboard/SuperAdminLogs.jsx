import { useState, useEffect, useCallback } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { icons } from '../../data/icons'
import api from '../../services/api'

const statusVariant = { success: 'accent', warning: 'warning', info: 'primary', error: 'danger' }

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E2E8F0] dark:bg-surface-700/50 rounded-xl ${className}`} />
}

export default function SuperAdminLogs() {
  const [search, setSearch] = useState('')
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async (q) => {
    setLoading(true)
    try {
      const { data } = await api.get(`/api/logs/ai?search=${encodeURIComponent(q)}&page=0&size=100`)
      setLogs(data || [])
    } catch {
      setLogs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLogs('')
  }, [fetchLogs])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchLogs(search), 400)
    return () => clearTimeout(t)
  }, [search, fetchLogs])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Logs IA</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Journal des appels et requêtes IA.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500">{icons.search}</div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par utilisateur ou action..."
            className="input-field pl-10"
          />
        </div>
        <Badge variant="accent">{logs.length} entrées</Badge>
      </div>

      <Card>
        {loading ? (
          <div className="space-y-2 p-2">
            {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-10" />)}
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12 text-surface-500 dark:text-surface-400 text-sm">
            <p className="text-2xl mb-2">📋</p>
            <p>Aucun log IA enregistré.</p>
            <p className="text-xs mt-1">Les logs s'accumulent au fil des appels IA (génération de séances, chat coach).</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Horodatage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Utilisateur</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Modèle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Tokens</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Latence</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
                {logs.map(log => (
                  <tr key={log.id} className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors">
                    <td className="px-4 py-3 text-xs text-surface-500 dark:text-surface-400 font-mono">{log.timestamp}</td>
                    <td className="px-4 py-3 font-medium text-surface-800 dark:text-white">{log.user}</td>
                    <td className="px-4 py-3">
                      <Badge variant="primary">{log.action}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-surface-500 dark:text-surface-400">{log.model}</td>
                    <td className="px-4 py-3">{log.tokens}</td>
                    <td className="px-4 py-3">{log.latency}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[log.status] || 'default'}>{log.status}</Badge>
                    </td>
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

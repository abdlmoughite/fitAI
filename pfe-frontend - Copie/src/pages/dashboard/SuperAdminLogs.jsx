import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { aiLogs } from '../../data/mockData'
import { icons } from '../../data/icons'

const statusVariant = { success: 'accent', warning: 'warning', info: 'primary', error: 'danger' }

export default function SuperAdminLogs() {
  const [search, setSearch] = useState('')
  const filtered = aiLogs.filter(l =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase())
  )

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
        <Badge variant="accent">{filtered.length} entrées</Badge>
      </div>

      <Card>
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
              {filtered.map((log, i) => (
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
      </Card>
    </div>
  )
}

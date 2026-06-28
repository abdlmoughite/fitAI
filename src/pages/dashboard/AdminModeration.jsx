import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import api from '../../services/api'

export default function AdminModeration() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [togglingId, setTogglingId] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/api/user?page=0&size=100')
      const allUsers = data.content || []
      setUsers(allUsers.filter(u => u.role?.roleName === 'client' || u.role?.roleName === 'admin'))
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (user) => {
    const nextStatus = user.status === 'active' ? 'suspended' : 'active'
    setTogglingId(user.id)
    try {
      await api.patch(`/api/user/${user.id}/status`, { status: nextStatus })
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: nextStatus } : u))
    } catch {
      // silent
    } finally {
      setTogglingId(null)
    }
  }

  const getFullName = (u) => `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.username || '—'
  const getInitials = (u) => {
    const f = u.firstname?.[0] || ''
    const l = u.lastname?.[0] || ''
    return (f + l).toUpperCase() || '?'
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Modération</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Gère les comptes utilisateurs et le contenu.</p>
      </div>

      <Card>
        <div className="flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400 mb-4">
          <span className="w-3 h-3 rounded-full bg-accent-500" /> Actif
          <span className="w-3 h-3 rounded-full bg-yellow-400 ml-3" /> En attente
          <span className="w-3 h-3 rounded-full bg-red-400 ml-3" /> Suspendu
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-[#E2E8F0] dark:bg-surface-700/30 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Utilisateur</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Plan</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Entraînements</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Inscrit le</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Statut</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
                {users.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">
                          {getInitials(u)}
                        </div>
                        <span className="font-medium text-surface-800 dark:text-white">{getFullName(u)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{u.email}</td>
                    <td className="px-4 py-3">{u.plan || 'Starter'}</td>
                    <td className="px-4 py-3">{u.totalWorkouts ?? 0}</td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">
                      {u.joinDate ? new Date(u.joinDate).toLocaleDateString('fr-FR') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        u.status === 'active' ? 'accent' :
                        u.status === 'pending' ? 'warning' : 'danger'
                      }>
                        {u.status === 'active' ? 'Actif' : u.status === 'pending' ? 'En attente' : 'Suspendu'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant={u.status === 'active' ? 'danger' : 'secondary'}
                        size="sm"
                        loading={togglingId === u.id}
                        onClick={() => toggleStatus(u)}
                      >
                        {u.status === 'active' ? 'Suspendre' : 'Réactiver'}
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-10 text-surface-500 dark:text-surface-400 text-sm">
                Aucun utilisateur trouvé.
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

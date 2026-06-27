import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { mockUsers } from '../../data/mockData'
import { icons } from '../../data/icons'

export default function AdminModeration() {
  const [users, setUsers] = useState(mockUsers)

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u
      const next = u.status === 'active' ? 'suspended' : u.status === 'suspended' ? 'active' : 'active'
      return { ...u, status: next }
    }))
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
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-surface-800 dark:text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{u.email}</td>
                  <td className="px-4 py-3">{u.plan}</td>
                  <td className="px-4 py-3">{u.workouts}</td>
                  <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{u.joinDate}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.status === 'active' ? 'accent' : u.status === 'pending' ? 'warning' : 'danger'}>
                      {u.status === 'active' ? 'Actif' : u.status === 'pending' ? 'En attente' : 'Suspendu'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant={u.status === 'active' ? 'danger' : 'secondary'}
                      size="sm"
                      onClick={() => toggleStatus(u.id)}
                    >
                      {u.status === 'active' ? 'Suspendre' : 'Réactiver'}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import { icons } from '../../data/icons'
import api from '../../services/api'

export default function SuperAdminAdmins() {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ firstname: '', lastname: '', email: '', password: '123456' })
  const [error, setError] = useState('')

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/api/user?page=0&size=50')
      const users = data.content || []
      // Show only admins and super_admins
      setAdmins(users.filter(u => u.role?.roleName === 'admin' || u.role?.roleName === 'super_admin'))
    } catch {
      setError('Impossible de charger les administrateurs.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newAdmin.firstname || !newAdmin.email) return
    try {
      await api.post('/api/user/create-admin', {
        firstname: newAdmin.firstname,
        lastname: newAdmin.lastname,
        email: newAdmin.email,
        password: newAdmin.password,
      })
      setShowCreate(false)
      setNewAdmin({ firstname: '', lastname: '', email: '', password: '123456' })
      loadAdmins()
    } catch (err) {
      setError(err.response?.data?.error || 'Échec de la création de l\'admin.')
    }
  }

  const getInitials = (u) => {
    const f = u.firstname?.[0] || ''
    const l = u.lastname?.[0] || ''
    return (f + l).toUpperCase() || '?'
  }

  const getFullName = (u) => `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.username

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Administrateurs</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Gère les comptes administrateurs de la plateforme.</p>
        </div>
        <Button variant="primary" icon={icons.users} onClick={() => setShowCreate(true)}>
          Créer un admin
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <div className="space-y-4 p-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-10 bg-[#E2E8F0] dark:bg-surface-700/30 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Admin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Rôle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Membre depuis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
                {admins.map((admin, i) => (
                  <motion.tr
                    key={admin.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="text-surface-600 dark:text-surface-300 hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-50 dark:bg-accent-500/20 flex items-center justify-center text-xs font-bold text-accent-600 dark:text-accent-400">
                          {getInitials(admin)}
                        </div>
                        <span className="font-medium text-surface-800 dark:text-white">{getFullName(admin)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{admin.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={admin.role?.roleName === 'super_admin' ? 'warning' : 'accent'}>
                        {admin.role?.roleName}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{admin.joinDate || '-'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {admins.length === 0 && (
              <div className="text-center py-10 text-surface-500 dark:text-surface-400 text-sm">
                Aucun administrateur trouvé.
              </div>
            )}
          </div>
        )}
      </Card>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Créer un administrateur">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Prénom" placeholder="Sophie" value={newAdmin.firstname} onChange={e => setNewAdmin(prev => ({ ...prev, firstname: e.target.value }))} />
            <Input label="Nom" placeholder="Laurent" value={newAdmin.lastname} onChange={e => setNewAdmin(prev => ({ ...prev, lastname: e.target.value }))} />
          </div>
          <Input label="Email" type="email" placeholder="admin@fitai.com" value={newAdmin.email} onChange={e => setNewAdmin(prev => ({ ...prev, email: e.target.value }))} />
          <Input label="Mot de passe" type="password" value={newAdmin.password} onChange={e => setNewAdmin(prev => ({ ...prev, password: e.target.value }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Annuler</Button>
            <Button variant="primary" onClick={handleCreate}>Créer</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

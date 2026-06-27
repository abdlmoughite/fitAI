import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import { useAuth } from '../../context/AuthContext'
import { icons } from '../../data/icons'

const roleConfig = {
  client: { label: 'Client', variant: 'primary', description: "Accès à l'espace d'entraînement et au coach IA." },
  admin: { label: 'Administrateur Support', variant: 'accent', description: 'Accès à la gestion des tickets, modération et support utilisateurs.' },
  super_admin: { label: 'Super Administrateur', variant: 'warning', description: 'Accès complet à la plateforme, gestion des admins, logs IA et paramètres système.' },
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const config = roleConfig[user?.role] || roleConfig.client

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const permissions = {
    client: [
      "Générer des programmes d'entraînement",
      'Chat avec le coach IA',
      'Voir ses analytiques',
      'Utiliser le chronomètre',
      'Gérer son profil',
    ],
    admin: [
      'Gérer les tickets support',
      'Modérer le contenu',
      'Voir les utilisateurs',
      'Gérer les programmes',
      'Accès aux analytiques limitées',
      'Répondre aux demandes',
    ],
    super_admin: [
      'Accès complet à la plateforme',
      'Gérer les administrateurs',
      'Voir les logs IA',
      'Surveiller la santé système',
      'Gérer les abonnements',
      'Configurations système',
      'Audit de sécurité',
    ],
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Profil</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Gère tes informations et paramètres.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Prénom" defaultValue={user?.name?.split(' ')[0] || ''} placeholder="Prénom" />
              <Input label="Nom" defaultValue={user?.name?.split(' ').slice(1).join(' ') || ''} placeholder="Nom" />
              <Input label="Email" type="email" defaultValue={user?.email || ''} className="sm:col-span-2" />
              <Input label="Taille (cm)" defaultValue="178" type="number" />
              <Input label="Poids (kg)" defaultValue="78.5" type="number" />
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Permissions</h3>
            <ul className="space-y-2">
              {(permissions[user?.role] || permissions.client).map((p, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <span className="text-accent-500 flex-shrink-0">{icons.check}</span>
                  <span className="text-surface-600 dark:text-surface-300">{p}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Notifications</h3>
            <div className="space-y-3">
              {[
                { label: "Rappels d'entraînement", desc: "Reçois un rappel pour tes séances programmées", on: true },
                { label: 'Notifications système', desc: 'Alertes et mises à jour de la plateforme', on: true },
                { label: 'Rapports hebdomadaires', desc: 'Reçois un résumé de tes activités', on: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-surface-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.on} className="sr-only peer" />
                    <div className="w-10 h-5 bg-[#CBD5E1] dark:bg-surface-700 rounded-full peer peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex flex-col items-center text-center">
              <Avatar name={user?.name || ''} initials={user?.initials || '?'} size="xl" className="mb-3" />
              <h3 className="text-base font-semibold text-surface-900 dark:text-white">{user?.name || 'Utilisateur'}</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">{user?.email}</p>
              <Badge variant={config.variant} className="mb-3">{config.label}</Badge>

              <div className="w-full space-y-2 text-sm border-t border-[#E2E8F0] dark:border-surface-700/50 pt-4 mt-2">
                <div className="flex justify-between text-surface-500 dark:text-surface-400">
                  <span>Membre depuis</span>
                  <span className="text-surface-700 dark:text-surface-300">{user?.joinDate || '-'}</span>
                </div>
                <div className="flex justify-between text-surface-500 dark:text-surface-400">
                  <span>Plan</span>
                  <span className="text-surface-700 dark:text-surface-300 font-medium">{user?.plan || 'Gratuit'}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#F8FAFC] dark:bg-surface-800/40 border border-[#E2E8F0] dark:border-surface-700/50 w-full">
                <p className="text-xs text-surface-500 dark:text-surface-400">{config.description}</p>
              </div>

              <Button variant="danger" size="sm" className="w-full mt-4" icon={icons.logOut} onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">Abonnement</h3>
            <div className="text-center py-2">
              <div className="text-2xl font-bold text-surface-900 dark:text-white mb-1">{user?.plan || 'Gratuit'}</div>
              <p className="text-xs text-surface-500 dark:text-surface-400 mb-3">
                {user?.role === 'super_admin' ? "Administration · Gratuit" : user?.role === 'admin' ? "Équipe · Gratuit" : '14,99 €/mois'}
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Gérer l'abonnement
              </Button>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="primary" size="lg" className="flex-1" onClick={handleSave}>
              {saved ? '✓ Enregistré' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

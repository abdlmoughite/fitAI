import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import { useAuth } from '../../context/AuthContext'
import { icons } from '../../data/icons'
import { userService } from '../../services/userService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

function mapBackendUser(backendUser) {
  const firstname = backendUser.firstname || ''
  const lastname = backendUser.lastname || ''
  const fullName = `${firstname} ${lastname}`.trim() || backendUser.username || 'Utilisateur'
  const initials = (firstname[0] || '') + (lastname[0] || '')
  const formattedInitials = initials ? initials.toUpperCase() : '?'
  const roleName = backendUser.role?.roleName || 'client'

  return {
    id: backendUser.id,
    name: fullName,
    email: backendUser.email || backendUser.username,
    role: roleName,
    initials: formattedInitials,
    plan: backendUser.plan || 'Starter',
    joinDate: backendUser.joinDate || null,
    stats: {
      totalWorkouts: backendUser.totalWorkouts || 0,
      totalMinutes: backendUser.totalMinutes || 0,
      currentStreak: backendUser.currentStreak || 0,
      bestStreak: backendUser.bestStreak || 0,
    },
    urlImage: backendUser.urlImage || null,
    city: backendUser.city || null,
    tel: backendUser.tel || null,
  }
}

const roleConfig = {
  client: { label: 'Client', variant: 'primary', description: "Accès à l'espace d'entraînement et au coach IA." },
  admin: { label: 'Administrateur Support', variant: 'accent', description: 'Accès à la gestion des tickets, modération et support utilisateurs.' },
  super_admin: { label: 'Super Administrateur', variant: 'warning', description: 'Accès complet à la plateforme, gestion des admins, logs IA et paramètres système.' },
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

export default function ProfilePage() {
  const { user, logout, updateProfile, setUser } = useAuth()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const config = roleConfig[user?.role] || roleConfig.client

  // Fix user data if it doesn't have proper initials
  useEffect(() => {
    if (user && !user.initials) {
      const names = (user?.name || '').split(' ')
      const firstName = names[0] || ''
      const lastName = names.slice(1).join(' ') || ''
      const initials = (firstName[0] || '') + (lastName[0] || '')
      const formattedInitials = initials ? initials.toUpperCase() : '?'
      const fixedUser = { ...user, initials: formattedInitials }
      setUser(fixedUser)
      localStorage.setItem('fitai-user', JSON.stringify(fixedUser))
    }
  }, [user, setUser])

  console.log('Current user state:', user)

  // Parse user name en prénom / nom
  const parseForm = (u) => {
    const names = (u?.name || '').split(' ')
    return {
      firstName: names[0] || '',
      lastName: names.slice(1).join(' ') || '',
      email: u?.email || '',
      city: u?.city || '',
      tel: u?.tel || '',
    }
  }

  const [form, setForm] = useState(() => parseForm(user))
  const syncedId = useRef(user?.id)

  // Re-sync si le user change (ex: changement de compte)
  if (user?.id !== syncedId.current) {
    syncedId.current = user?.id
    setForm(parseForm(user))
  }

  const { firstName, lastName, email, city, tel } = form
  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = async () => {
    setError(null)
    try {
      const dto = {
        id: user?.id,
        firstname: firstName,
        lastname: lastName,
        email,
        city,
        tel,
      }
      await updateProfile(dto)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error('Erreur mise à jour profil', e)
      setError('Impossible de sauvegarder les modifications. Réessaie.')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleProfilePictureUpload(file)
    }
  }

  const handleProfilePictureUpload = async (file) => {
    setUploading(true)
    setError(null)
    try {
      console.log('Uploading profile picture for user:', user?.id)
      const updatedUser = await userService.uploadProfilePicture(user?.id, file)
      console.log('Upload response:', updatedUser)
      const mappedUser = mapBackendUser(updatedUser)
      console.log('Mapped user:', mappedUser)
      setUser(mappedUser)
      localStorage.setItem('fitai-user', JSON.stringify(mappedUser))
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error('Erreur upload photo', e)
      setError('Impossible de télécharger la photo. Réessaie.')
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Profil</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Gère tes informations et paramètres.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Prénom" value={firstName} onChange={setField('firstName')} placeholder="Prénom" />
              <Input label="Nom" value={lastName} onChange={setField('lastName')} placeholder="Nom" />
              <Input label="Email" type="email" value={email} onChange={setField('email')} className="sm:col-span-2" />
              <Input label="Ville" value={city} onChange={setField('city')} />
              <Input label="Téléphone" value={tel} onChange={setField('tel')} />
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-500 dark:text-red-400">{error}</p>
            )}

            {/* Bouton Enregistrer placé ici, directement sous le formulaire */}
            <div className="mt-5 flex justify-end">
              <Button variant="primary" size="md" onClick={handleSave}>
                {saved ? '✓ Enregistré' : 'Enregistrer les modifications'}
              </Button>
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

        {/* Colonne latérale */}
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3 cursor-pointer group" onClick={handleAvatarClick}>
                <Avatar
                  name={user?.name || ''}
                  initials={user?.initials || '?'}
                  src={user?.urlImage ? `${API_BASE_URL}/uploads/Users/${user.urlImage}` : undefined}
                  size="xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">{uploading ? '...' : 'Changer'}</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
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
                {user?.role === 'super_admin'
                  ? 'Administration · Gratuit'
                  : user?.role === 'admin'
                  ? 'Équipe · Gratuit'
                  : '14,99 €/mois'}
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Gérer l'abonnement
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

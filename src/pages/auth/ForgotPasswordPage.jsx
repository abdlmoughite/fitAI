import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { authService } from '../../services/authService'
import { icons } from '../../data/icons'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Une erreur est survenue'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] border border-[#E2E8F0] p-8 dark:bg-surface-800/40 dark:border-surface-700/30">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="M12 3 21 12"/><path d="M3 12 12 21"/></svg>
            </div>
            <span className="font-bold text-surface-900 text-xl dark:text-white">FitAI</span>
          </Link>
          <h1 className="text-xl font-bold text-surface-900 dark:text-white">
            Mot de passe oublié ?
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            {error}
          </div>
        )}

        {success ? (
          <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400">
            <p className="font-semibold mb-1">Email envoyé !</p>
            <p>Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.</p>
            <p className="mt-2 text-xs">Le lien expire dans 1 heure.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="exemple@email.com"
              icon={icons.mail}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Envoyer le lien
            </Button>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-[#E2E8F0] dark:border-surface-700/50 text-center">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium transition-colors dark:text-primary-400">
              Retour à la connexion
            </Link>
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-600 transition-colors dark:text-surface-500 dark:hover:text-surface-300">
          {icons.chevronRight}
          Retour à l'accueil
        </Link>
      </div>
    </motion.div>
  )
}

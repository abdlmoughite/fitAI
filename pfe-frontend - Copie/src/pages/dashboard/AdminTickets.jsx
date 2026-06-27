import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import { icons } from '../../data/icons'
import { ticketService } from '../../services/ticketService'
import { useAuth } from '../../context/AuthContext'

const statusVariant = { open: 'warning', in_progress: 'primary', resolved: 'accent', closed: 'default' }
const priorityVariant = { high: 'danger', medium: 'warning', low: 'primary' }

export default function AdminTickets() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      setLoading(true)
      const data = await ticketService.getAll()
      setTickets(data)
    } catch {
      setError('Impossible de charger les tickets. Vérifiez que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = filter === 'all' ? tickets : tickets.filter(t => t.status === filter)

  const updateStatus = async (id, status) => {
    try {
      const updated = await ticketService.updateStatus(id, status)
      setTickets(prev => prev.map(t => t.id === id ? updated : t))
      setSelected(null)
    } catch {
      setError('Échec de la mise à jour du statut.')
    }
  }

  const handleReply = async () => {
    if (!reply.trim() || !selected) return
    try {
      const updated = await ticketService.addMessage(selected.id)
      setTickets(prev => prev.map(t => t.id === selected.id ? updated : t))
      setSelected(updated)
      setReply('')
    } catch {
      setError('Échec de l\'envoi du message.')
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Tickets Support</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">Gère les demandes des utilisateurs.</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {['all', 'open', 'in_progress', 'resolved', 'closed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20'
                : 'bg-white text-surface-600 border border-[#E2E8F0] hover:bg-[#F1F5F9] dark:bg-surface-800 dark:text-surface-400 dark:border-surface-700 dark:hover:bg-surface-700'
            }`}
          >
            {f === 'all' ? 'Tous' : f === 'in_progress' ? 'En cours' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="glass-card p-4 animate-pulse">
              <div className="h-4 bg-[#E2E8F0] dark:bg-surface-700/50 rounded w-1/2 mb-2" />
              <div className="h-3 bg-[#E2E8F0] dark:bg-surface-700/30 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-surface-500 dark:text-surface-400 text-sm">
              Aucun ticket trouvé.
            </div>
          ) : (
            filtered.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card p-4 cursor-pointer hover:border-[#CBD5E1] dark:hover:border-surface-600/50 transition-all"
                onClick={() => setSelected(ticket)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{ticket.subject}</h3>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
                      {ticket.user} · {ticket.date} · {ticket.messages} messages
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Badge variant={priorityVariant[ticket.priority]}>{ticket.priority}</Badge>
                    <Badge variant={statusVariant[ticket.status] || 'default'}>{ticket.status}</Badge>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      <Modal open={!!selected} onClose={() => { setSelected(null); setReply('') }} title={selected?.subject || 'Ticket'} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={priorityVariant[selected.priority]}>{selected.priority}</Badge>
              <Badge variant={statusVariant[selected.status] || 'default'}>{selected.status}</Badge>
              <span className="text-xs text-surface-500 dark:text-surface-400">{selected.user} · {selected.date}</span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
              {Array.from({ length: selected.messages }).map((_, i) => (
                <div key={i} className={`flex gap-3 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    i % 2 === 0 ? 'bg-primary-100 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400' : 'bg-accent-50 text-accent-600 dark:bg-accent-500/20 dark:text-accent-400'
                  }`}>
                    {i % 2 === 0 ? selected.user.split(' ').map(n => n[0]).join('') : 'SA'}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                    i % 2 === 0 ? 'bg-white dark:bg-surface-800/60 border border-[#E2E8F0] dark:border-surface-700/50 text-surface-700 dark:text-surface-300' : 'bg-primary-50 dark:bg-primary-500/10 text-surface-700 dark:text-surface-300'
                  }`}>
                    Message #{i + 1} concernant "{selected.subject}".
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Écrire une réponse..."
                className="input-field flex-1"
                onKeyDown={e => e.key === 'Enter' && handleReply()}
              />
              <Button variant="primary" onClick={handleReply} disabled={!reply.trim()} icon={icons.send} />
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#E2E8F0] dark:border-surface-700/30">
              {selected.status !== 'resolved' && (
                <Button variant="accent" size="sm" onClick={() => updateStatus(selected.id, 'resolved')}>
                  Marquer résolu
                </Button>
              )}
              {selected.status !== 'in_progress' && (
                <Button variant="primary" size="sm" onClick={() => updateStatus(selected.id, 'in_progress')}>
                  Prendre en charge
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Fermer</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

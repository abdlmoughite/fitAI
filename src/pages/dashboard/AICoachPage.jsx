import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatBubble from '../../components/dashboard/ChatBubble'
import { quickReplies } from '../../data/mockData'
import { icons } from '../../data/icons'
import { aiCoachService } from '../../services/aiCoachService'
import { useAuth } from '../../context/AuthContext'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'ai',
  content: "Salut ! Je suis ton coach IA FitAI 💪 Pose-moi tes questions sur l'entraînement, la nutrition ou la récupération !",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}

function historyToMessages(history) {
  return history.flatMap((entry, i) => [
    {
      id: `h-user-${i}`,
      role: 'user',
      content: entry.userMessage,
      timestamp: new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: `h-ai-${i}`,
      role: 'ai',
      content: entry.aiResponse,
      timestamp: new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
}

export default function AICoachPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!user?.id) return
    aiCoachService.getHistory(user.id).then(history => {
      if (history.length > 0) {
        setMessages([WELCOME_MESSAGE, ...historyToMessages(history)])
      }
    }).catch(() => {})
  }, [user?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    const msg = text || input
    if (!msg.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: msg.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const responseText = await aiCoachService.chat(msg.trim(), user?.id, user?.name)
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
    } catch {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "Désolé, je n'arrive pas à me connecter au serveur. Vérifie que le backend est démarré sur le port 8080.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Coach IA</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Pose-moi toutes tes questions fitness</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-medium border border-accent-200 dark:border-accent-500/20">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          En ligne
        </div>
      </div>

      <div className="flex-1 glass-card p-4 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
          {messages.map(msg => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-50 dark:bg-accent-500/20 flex items-center justify-center text-xs font-bold text-accent-600 dark:text-accent-400">AI</div>
              <div className="rounded-2xl rounded-tl-md px-4 py-3 bg-white dark:bg-surface-800/60 border border-[#E2E8F0] dark:border-surface-700/50">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 mb-3">
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => handleSend(qr)}
              className="px-3 py-1.5 text-xs rounded-lg bg-[#F8FAFC] dark:bg-surface-800/60 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-700 transition-colors border border-[#E2E8F0] dark:border-surface-700/50"
            >
              {qr}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Pose ta question au coach..."
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary px-4 disabled:opacity-40"
          >
            {icons.send}
          </button>
        </form>
      </div>
    </div>
  )
}

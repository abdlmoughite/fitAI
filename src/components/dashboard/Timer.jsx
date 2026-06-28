import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { icons } from '../../data/icons'

export default function Timer({ initialSeconds = 0, onComplete, autoStart = false }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(autoStart)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 0) {
            clearInterval(intervalRef.current)
            setRunning(false)
            onComplete?.()
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, onComplete])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const setMinutes = (n) => setSeconds(n * 60)

  const reset = () => { clearInterval(intervalRef.current); setRunning(false); setSeconds(0) }

  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl sm:text-6xl font-mono font-bold text-surface-900 dark:text-white tabular-nums mb-4">
        {formatTime(seconds)}
      </div>

      <div className="flex items-center gap-2 mb-3">
        {[1, 2, 3, 5, 10].map(m => (
          <button
            key={m}
            onClick={() => setMinutes(m)}
            className="px-3 py-1 text-xs rounded-lg bg-[#F8FAFC] dark:bg-surface-800/60 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-surface-700 transition-colors border border-[#E2E8F0] dark:border-surface-700/50"
          >
            {m}min
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {!running ? (
          <button onClick={() => setRunning(true)} className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transition-shadow">
            {icons.play}
          </button>
        ) : (
          <button onClick={() => setRunning(false)} className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            {icons.pause}
          </button>
        )}
        <button onClick={reset} className="w-10 h-10 rounded-full bg-white dark:bg-surface-800/60 flex items-center justify-center text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-white border border-[#E2E8F0] dark:border-surface-700/50">
          {icons.refreshCw}
        </button>
      </div>

      {seconds > 0 && (
        <div className="w-full mt-4 bg-[#E2E8F0] dark:bg-surface-700/30 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${(seconds / (seconds + 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  )
}

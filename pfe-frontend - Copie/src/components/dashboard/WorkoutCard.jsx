import { motion } from 'framer-motion'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { icons } from '../../data/icons'

export default function WorkoutCard({ workout, index = 0, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-5 hover:border-[#CBD5E1] dark:hover:border-surface-600/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-surface-900 dark:text-white">{workout.name}</h3>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{workout.type} · {workout.level}</p>
        </div>
        <Badge variant="accent">{workout.duration} min</Badge>
      </div>

      <div className="flex gap-4 mb-4 text-xs text-surface-500 dark:text-surface-400">
        <span className="flex items-center gap-1">{icons.clock} {workout.duration} min</span>
        <span className="flex items-center gap-1">{icons.flame} {workout.calories} kcal</span>
        <span className="flex items-center gap-1">{icons.dumbbell} {workout.sessions} sessions/sem</span>
      </div>

      <div className="space-y-1.5 mb-4">
        {workout.exercises.slice(0, 4).map((ex, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-surface-600 dark:text-surface-300">{ex.name}</span>
            <span className="text-surface-500 dark:text-surface-400">{ex.sets}×{ex.reps}</span>
          </div>
        ))}
        {workout.exercises.length > 4 && (
          <p className="text-xs text-surface-500 dark:text-surface-400 pt-1">+{workout.exercises.length - 4} autres exercices</p>
        )}
      </div>

      <Button
        variant="primary"
        size="sm"
        className="w-full"
        icon={icons.chevronRight}
        onClick={() => onSelect?.(workout)}
      >
        Démarrer cette séance
      </Button>
    </motion.div>
  )
}

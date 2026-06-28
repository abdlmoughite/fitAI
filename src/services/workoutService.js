import api from './api'

export const workoutService = {
  async generate(goal, level, duration) {
    const { data } = await api.post('/api/workout/generate', {
      goal,
      level,
      duration: parseInt(duration),
    })
    // Map backend WorkoutPlan entity to frontend workoutPrograms format
    return data.map((plan) => ({
      id: String(plan.id),
      name: plan.name,
      type: plan.type,
      level: plan.level,
      duration: plan.duration,
      sessions: plan.sessions,
      calories: plan.calories,
      exercises: (plan.exercises || []).map((ex) => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest,
      })),
    }))
  },
}

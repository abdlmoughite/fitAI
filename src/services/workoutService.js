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

  async getSavedPlans(userId) {
    const { data } = await api.get(`/api/user/${userId}/workout-plans`)
    return data
  },

  async savePlan(userId, plan) {
    const { data } = await api.post(`/api/user/${userId}/workout-plan`, plan)
    return data
  },

  async deleteSavedPlan(planId, userId) {
    await api.delete(`/api/workout-plan/${planId}?userId=${userId}`)
  },
}

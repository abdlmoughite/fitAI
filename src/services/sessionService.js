import api from './api'

export const sessionService = {
  async startSession(userId, plan, exercises) {
    const { data } = await api.post('/api/sessions/start', {
      userId,
      workoutPlanName: plan.name,
      workoutPlanType: plan.type,
      workoutPlanLevel: plan.level,
      exercises: exercises.map(ex => ({
        name: ex.name,
        plannedSets: ex.sets,
        reps: ex.reps,
        weight: ex.weight || '0 kg',
      })),
    })
    return data // { sessionId, startTime }
  },

  async completeSession(sessionId, { durationMinutes, caloriesBurned, exercises }) {
    const { data } = await api.put(`/api/sessions/${sessionId}/complete`, {
      durationMinutes,
      caloriesBurned,
      completedExercises: exercises.map(ex => ({
        name: ex.name,
        completedSets: ex.completed ? ex.sets : ex.currentSet,
        completed: ex.completed,
      })),
    })
    return data // { sessionId, user }
  },

  async getSessionsByUser(userId) {
    const { data } = await api.get(`/api/sessions/user/${userId}`)
    return data
  },
}

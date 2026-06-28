import api from './api'

export const userService = {
  async getById(id) {
    const { data } = await api.get(`/api/user/${id}`)
    return data
  },

  async getAll(page = 0, size = 20) {
    const { data } = await api.get(`/api/user?page=${page}&size=${size}`)
    return data // Page<User> from Spring
  },

  async updateProfile(userDto) {
    const { data } = await api.put('/api/user', userDto)
    return data
  },

  async changePassword(id, currentPassword, newPassword) {
    await api.post(`/api/user/change-password/${id}`, { currentPassword, newPassword })
  },

  async uploadProfilePicture(id, file) {
    const formData = new FormData()
    formData.append('profilePicture', file)
    const { data } = await api.post(`/api/user/edit-profile-image/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async getWeeklySummary(id) {
    const { data } = await api.get(`/api/user/${id}/analytics/weekly-calories`)
    return data
  },

  async getMonthlyProgress(id) {
    const { data } = await api.get(`/api/user/${id}/analytics/monthly-workouts`)
    return data
  },

  async getPerformanceByExercise(id) {
    const { data } = await api.get(`/api/user/${id}/analytics/performance-by-exercise`)
    return data
  },

  async getMuscleDistribution(id) {
    const { data } = await api.get(`/api/user/${id}/analytics/muscle-distribution`)
    return data
  },

  async getWorkoutHistory(id) {
    const { data } = await api.get(`/api/user/${id}/workout-history`)
    return data
  },
}

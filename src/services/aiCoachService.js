import api from './api'

export const aiCoachService = {
  async chat(message, userId, userName) {
    const { data } = await api.post('/api/ai-coach/chat', { message, userId, userName })
    return data.response
  },

  async getHistory(userId) {
    const { data } = await api.get(`/api/ai-coach/history/${userId}`)
    return data
  },
}

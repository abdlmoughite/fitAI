import api from './api'

export const aiCoachService = {
  async chat(message) {
    const { data } = await api.post('/api/ai-coach/chat', { message })
    return data.response
  },
}

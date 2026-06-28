import api from './api'

export const ticketService = {
  async getAll() {
    const { data } = await api.get('/api/tickets')
    return data.map(mapTicket)
  },

  async create(subject, priority, userId, userName) {
    const { data } = await api.post('/api/tickets', { subject, priority, userId, userName })
    return mapTicket(data)
  },

  async updateStatus(id, status) {
    const { data } = await api.patch(`/api/tickets/${id}/status`, { status })
    return mapTicket(data)
  },

  async addMessage(id) {
    const { data } = await api.post(`/api/tickets/${id}/message`)
    return mapTicket(data)
  },

  async delete(id) {
    const { data } = await api.delete(`/api/tickets/${id}`)
    return data
  },
}

function mapTicket(t) {
  return {
    id: String(t.id),
    subject: t.subject,
    user: t.userName || 'Utilisateur',
    status: t.status,
    priority: t.priority,
    date: t.date || new Date().toISOString().split('T')[0],
    messages: t.messageCount || 0,
  }
}

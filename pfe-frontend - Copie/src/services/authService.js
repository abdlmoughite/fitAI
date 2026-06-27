import api from './api'

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/api/authentication/authenticate', {
      username: email,
      password,
    })
    return data // { accessToken, user }
  },

  async register(firstname, lastname, email, password) {
    const { data } = await api.post('/api/authentication/register', {
      firstname,
      lastname,
      email,
      password,
    })
    return data // { accessToken, user }
  },

  async checkToken(token) {
    try {
      const { data } = await api.post('/api/authentication/check-token', token, {
        headers: { 'Content-Type': 'text/plain' },
      })
      return data
    } catch {
      return false
    }
  },
}

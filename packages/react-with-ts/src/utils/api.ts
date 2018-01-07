import axios from 'axios'

export const Api = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 20000,
})

Api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.request.status === 401) {
    // trikey way
    window.location.href = '/login'
  }
})

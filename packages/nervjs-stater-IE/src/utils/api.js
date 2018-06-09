import axios from 'axios'

export const Api = axios.create({
  baseURL: '/api',
  withCredentials:true,
  timeout: 20000,
})

Api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    // trikey way
    window.location.href = '/login'
  }
})

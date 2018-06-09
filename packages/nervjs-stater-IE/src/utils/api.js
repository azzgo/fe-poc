import axios from 'axios'

export const Api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/azzgo/retain-mock-data',
  withCredentials:true,
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

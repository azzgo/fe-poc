import axios from 'axios'

export const Api = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 20000,
})

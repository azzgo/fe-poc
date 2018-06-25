import axios from 'axios'
import Vue from 'vue'

import Loading from 'src/components/Loading.vue'

const loadingMount = new Vue({
  el: document.getElementById('loading'),
  render(h) {
    return h(Loading, { props: { visible: this.visible } })
  },
  data() {
    return {
      visible: false,
    }
  },
})

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
})

let concurrentRequestCount = 0

apiClient.interceptors.request.use((config) => {
  concurrentRequestCount++
  if (!loadingMount.$data.visible) {
    loadingMount.$data.visible = true
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    concurrentRequestCount--
    if (concurrentRequestCount === 0) {
      loadingMount.$data.visible = false
    }

    return response
  },
  (error) => {
    concurrentRequestCount--
    if (concurrentRequestCount === 0) {
      loadingMount.$data.visible = false
    }

    return Promise.reject(error)
  },
)

export default apiClient

const { ipcRenderer } = require('electron')

new Vue({
  data () {
    return {
      form: {
        isSwagger: false,
        uiPath: '/',
        port: 3001,
        urlPath: '/rest/v1',
        swProtocol: 'http',
        swHost: 'localhost',
        swPort: '80',
        swPath: ''
      },
      serverWorking: false
    }
  },
  created () {
  },
  methods: {
    startServer () {
      ipcRenderer.send('start-server', this.form)
      ipcRenderer.once('start-server-ok', () => {
        this.serverWorking = true
      })
    },
    stopServer () {
      ipcRenderer.send('stop-server')
      ipcRenderer.once('stop-server-ok', () => {
        this.serverWorking = false
      })
    }
  }
}).$mount('#app')

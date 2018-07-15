const { ipcRenderer } = require('electron')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
  form: {
    isSwagger: false,
    uiPath: '/',
    port: 3001,
    urlPath: '/rest/v1',
    swProtocol: 'http',
    swHost: 'localhost',
    swPort: '80',
    swPath: ''
  }
}).write()

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
    this.form = db.get('form').value()
  },
  methods: {
    startServer () {
      db.set('form', this.form).write()
      ipcRenderer.send('start-server', this.form)
      ipcRenderer.once('start-server-ok', () => {
        new Notification('通知', {
          body: '应用启动成功'
        })
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

const { ipcMain } = require('electron')
const path = require('path')
const startServer = require('../mock')
const { enableDestroy } = require('./utils')
let server

/**
 * @param {Electron.BrowserWindow} win
 */
function initializeIpc (win) {
  ipcMain.on('start-server', (event, form) => {
    const options = {
      uiPath: form.uiPath,
      port: form.port,
      urlPath: form.urlPath
    }

    if (form.isSwagger) {
      options.swaggerImport = {
        protocol: form.swProtocol,
        host: form.swHost,
        port: form.swPort,
        path: form.swPath,
        replacePathsStr: '',
        createErrorFile: true,
        createEmptyFile: true,
        overwriteExistingDescriptions: true,
        responseFuncPath: path.resolve(__dirname, '../mock/func-imported'),
        dest: path.resolve(__dirname, '../mock/rest')
      }
    }

    try {
      server = startServer(options)
      enableDestroy(server.appController.server)
      event.sender.send('start-server-ok')
    } catch (e) {
      console.error(e)
      event.sender.send('start-server-error', e)
    }
  })


  ipcMain.on('stop-server', (event, _form) => {
    try {
      server.appController.server.destroy(() => {
        server = null
        event.sender.send('stop-server-ok')
      })
    } catch (e) {
      console.error(e)
      event.sender.send('stop-server-error', e)
    }
  })
}

module.exports = initializeIpc

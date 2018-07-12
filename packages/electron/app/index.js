const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const initializeIpc = require('./initializeIpc')

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.resolve(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  process.env.NODE_ENV === 'debug' && win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  initializeIpc(win)
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

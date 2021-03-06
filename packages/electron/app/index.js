const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const initializeIpc = require('./initializeIpc')

 // Set the Debug tools.
 process.env.NODE_ENV !== 'prod' && require("electron-debug")({showDevTools: false});

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.resolve(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

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

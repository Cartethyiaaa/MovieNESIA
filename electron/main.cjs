const { app, BrowserWindow, shell } = require('electron')
const path = require('node:path')

function createWindow(){
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 960, minHeight: 600,
    backgroundColor: '#0a0b12',
    icon: path.join(__dirname, '../assets/icon.png'),
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true, spellcheck: false }
  })
  const devServer = process.env.VITE_DEV_SERVER_URL
  if (devServer) win.loadURL(devServer)
  else win.loadFile(path.join(__dirname, '../dist/index.html'))
  win.webContents.setWindowOpenHandler(({url})=>{ shell.openExternal(url); return {action:'deny'} })
  win.webContents.on('will-navigate', (e, url)=>{
    try { const u=new URL(url); if(!['http:','https:'].includes(u.protocol)){ e.preventDefault(); shell.openExternal(url) } } catch { e.preventDefault() }
  })
}
app.whenReady().then(createWindow)
app.on('window-all-closed', ()=>{ if(process.platform!=='darwin') app.quit() })
app.on('activate', ()=>{ if(BrowserWindow.getAllWindows().length===0) createWindow() })

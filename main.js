const {app, BrowserWindow,ipcMain} = require('electron')
const url = require("url");
const path = require("path");


let mainWindowconst;
 ipc = ipcMain;


function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname,'preload.js')
    }
  })
  //mainWindow.loadFile(path.join(__dirname, `dist/DemoElectron/index.html`))
  
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.setBackgroundColor('#343B48');
  mainWindow.webContents.openDevTools();

  
    //// CLOSE APP
    ipc.on('minimizeApp', ()=>{
      console.log('Clicked on Minimize Btn')
      win.minimize()
  })

  //// MAXIMIZE RESTORE APP
  ipc.on('maximizeRestoreApp', ()=>{
      if(mainWindow.isMaximized()){
          console.log('Clicked on Restore')
          mainWindow.restore()
      } else {
          console.log('Clicked on Maximize')
          mainWindow.maximize()
      }
  })
  // Check if is Maximized
  mainWindow.on('maximize', ()=>{
    mainWindow.webContents.send('isMaximized')
  })
  // // Check if is Restored
  // mainWindow.on('unmaximize', ()=>{
  //   mainWindow.webContents.send('isRestored')
  // })

  //// CLOSE APP
  ipc.on('closeApp', ()=>{
      console.log('Clicked on Close Btn')
      mainWindow.close()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})



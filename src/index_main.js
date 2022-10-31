const { app, BrowserWindow, ipcMain } = require('electron');
const cp = require('child_process');
const path = require('path');
require('dotenv').config();

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'index_preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  createWindow();
  cp.exec("flask run", {cwd: process.env.OCR_API_PATH});
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Testing IP Communication by printing electron version
ipcMain.handle("get-version", async (event, args) => {
  return process.versions.electron;
})

ipcMain.handle("send-back-to-renderer", async (event, content) => {
  return content;
})

ipcMain.handle("get-host", (event, args) => {
  return process.env.HOST;
})
const axios = require('axios');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// const { JSDOM } = require('jsdom');
// const { window } = new JSDOM("");
const $ = require("jquery");
require('dotenv').config();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'index_preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * Testing IP Communication by printing electron version
 */
ipcMain.handle("get-version", async (event, args) => {
  console.log(process.versions.electron);
  return process.versions.electron;
})

// ipcMain.handle("convert-img-to-txt", async (event, data) => {
//   console.log(data);
//   let text = await axios.post(
//     process.env.HOST + "/",
//     data,
//   );
//   return text;
// })

ipcMain.handle("convert-img-to-txt", async (event, data) => {
  console.log(data);
  let url = process.env.HOST;
  let text;
  $.ajax(url + "/", {
    type: 'POST',
    data: data,
    contentType: false,
    processData: false,
    success: function(response) {
      let {img_path, fulltxt} = response;
      text = fulltxt;
    }
  });
  return text;
})
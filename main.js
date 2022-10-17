const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { JSDOM } = require( "jsdom" );
const { default: axios } = require('axios');
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
require('dotenv').config();

let text;
let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        }
    })

    win.loadFile('index.html');
    win.webContents.openDevTools();
    win.webContents.send("showText", text ? text : "text undefined");

}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("receiveData", (event, formData) => {
    axios.post(
        process.env.HOST + '/',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then((response) => {
        let { img_path, fulltxt } = response;
        text = response;z
    })
})
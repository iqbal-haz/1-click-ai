const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
let $ = require('jquery');

let text
let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    // win.$ = $;

    win.loadFile('index.html');
    win.webContents.openDevTools();
    win.webContents.send("showText", text);

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
    let url = "http://127.0.0.1:5000";
    console.log("masuk AJAX")
    $.ajax({
        url: url + '/',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            let {img_path, fulltxt} = response;
            text = fulltxt;
        }
    });
});
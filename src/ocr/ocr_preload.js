const { contextBridge, ipcRenderer } = require('electron');

const ocrBridge = {
    imageToText: (data) => ipcRenderer.invoke("convert-img-to-txt", data),
}

module.exports = ocrBridge;
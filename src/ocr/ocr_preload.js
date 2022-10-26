const { contextBridge, ipcRenderer } = require('electron');

const ocrBridge = {
    bounce: (content) => ipcRenderer.invoke("send-back-to-renderer", content),
    getHost: () => ipcRenderer.invoke("get-host"),
}

module.exports = { ocrBridge };
const { contextBridge, ipcRenderer } = require('electron');

const ocrBridge = {
    bounce: (content) => {
        console.log('inside ocrBridge preload');
        console.log(content);
        return ipcRenderer.invoke("send-back-to-renderer", content);
    },
    getHost: () => ipcRenderer.invoke("get-host"),
}

module.exports = {ocrBridge};
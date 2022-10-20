const { contextBridge, ipcRenderer } = require('electron');

const ocrBridge = {
    imageToText: (data) => {
        console.log('inside ocrBridge preload');
        console.log(data.size == null);
        ipcRenderer.invoke("convert-img-to-txt", data);
    }
}

module.exports = {ocrBridge};
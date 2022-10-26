const { contextBridge, ipcRenderer } = require('electron');
const { ocrBridge } = require('./ocr/ocr_preload');

let indexBridge = {
    getVersion: () => ipcRenderer.invoke("get-version"),
}

let Bridge;

if (location.pathname.endsWith('index.html')) {
    Bridge = indexBridge;
} else if (location.pathname.endsWith('ocr.html')) {
    Bridge = ocrBridge;
}

contextBridge.exposeInMainWorld('bridge', Bridge);
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');
const ocrBridge = require('./ocr/ocr_preload');

console.log(ocrBridge)

let indexBridge = {
    getVersion: () => ipcRenderer.invoke("get-version"),
}

let Bridge;

if (location.pathname.endsWith('index.html')) {
    Bridge = indexBridge;
} else if (location.pathname.endsWith('ocr.html')) {
    console.log("masuk else if")
    Bridge = ocrBridge;
}

console.log(Bridge);

contextBridge.exposeInMainWorld('bridge', Bridge);
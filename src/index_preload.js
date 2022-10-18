// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

let indexBridge = {
    getVersion: () => ipcRenderer.invoke("get-version"),
}

contextBridge.exposeInMainWorld('bridge', indexBridge);
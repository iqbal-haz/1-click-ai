const { contextBridge, ipcRenderer } = require('electron')

let postData = (formData) => {
    console.log("masuk postData preload")
    ipcRenderer.send("receivedData", formData)
}

let showText = (callback) => {
    console.log("masuk showText preload")
    ipcRenderer.on("showText", (callback))
}

let bridge = {
    postData: postData,
    showText: showText
}

contextBridge.exposeInMainWorld("bridge", bridge)
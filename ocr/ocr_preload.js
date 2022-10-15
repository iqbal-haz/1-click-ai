const { contextBridge, ipcRenderer } = require('electron')
const $ = require('jquery')
require('dotenv').config()

let url = process.env.HOST

let postData = (formData) => {
    console.log("masuk postData preload")

    console.log("masuk AJAX")
    $.ajax({
        url: url + '/',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            let {img_path, fulltxt} = response;
            ipcRenderer.send("receiveData", fulltxt);
        }
    });
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
const { contextBridge } = require('electron')
const ocrBridge = require('./ocr/ocr_preload')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
});

let bridge;
if (location.href.endsWith('ocr.html')) {
  bridge = ocrBridge;
}

contextBridge.exposeInMainWorld('bridge', bridge);
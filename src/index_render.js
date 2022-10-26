$("#electron-ver-btn").on("click", async () => {
    let version = await window.bridge.getVersion();
    document.getElementById("electron-ver").innerHTML = version;
})
$("#electron-ver-btn").on("click", async () => {
    console.log("button clicked");
    let version = await window.bridge.getVersion();
    console.log(version);
    document.getElementById("electron-ver").innerHTML = version;
})
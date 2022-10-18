$("#extract").on("click", () => {
    console.log("button clicked -> imageToText render");
    let data = new FormData();
    let image = $("#image")[0].files[0];
    data.append('image', image);
    console.log(data);

    document.getElementById("#result").innerHTML = imageToText(data);
});

async function imageToText(data) {
    let result = await window.bridge.imageToText(data);
    return result;
}
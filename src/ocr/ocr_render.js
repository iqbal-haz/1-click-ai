$("#extract").on("click", () => {
    console.log("button clicked -> imageToText render");
    let data = new FormData();
    let image = $("#image")[0].files[0];
    data.append('image', image);
    console.log(data.entries().next().done);

    let result = imageToText(data);
    document.querySelector("#result").innerHTML = result;
});

async function imageToText(data) {
    console.log('inside imageToText render');
    console.log(countIter(data.entries()));
    let result = await window.bridge.imageToText(data);
    return result;
}

function previewImage(event) {
    let image = URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0]);
    let imagediv = document.querySelector("#preview");
    let newimage = document.createElement("img");
    newimage.src = image;
    imagediv.appendChild(newimage);
}

function countIter(iterator) {
    let i = 0;
    while (!iterator.next().done) {
        i++;
    }
    return i;
}
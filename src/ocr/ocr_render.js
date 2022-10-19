function extractText(event) {
    console.log("masuk extract text");
    let image = event.target.files[0];
    console.log(image);
    let formData = new FormData();
    formData.append('image', image);
    console.log(formData);

    document.getElementById("result").innerHTML = imageToText(formData);
}

async function imageToText(data) {
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
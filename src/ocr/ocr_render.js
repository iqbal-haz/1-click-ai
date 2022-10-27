const extractBtn = document.getElementById('extract')
extractBtn.addEventListener("click", async function() {
    let data = new FormData();
    let image = $("#image")[0].files[0];
    data.append('image', image);

    const host = await getHost();

    axios.post(host + '/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(async function(response) {
        let { fulltxt, img_path } = response.data;
        document.getElementById('result').innerHTML = await bounce(fulltxt);
    });
});

/**
 * @param {*} content 
 * @returns the exact same thing passed in but has 
 * sent through the main process and wrapped in promise
 */
async function bounce(content) {
    return await window.bridge.bounce(content);
}

async function getHost() {
    return await window.bridge.getHost();
}

function previewImage(event) {
    let image = URL.createObjectURL(event.target.files[0]);
    let imagediv = document.querySelector("#preview");
    imagediv.innerHTML = "";
    let newimage = document.createElement("img");
    newimage.classList.add(...["mh-100", "mw-100"]);
    newimage.src = image;
    if (!imageLoaded()) {
        imagediv.appendChild(newimage);
        enableExtractBtn();
    } else {
        let oldImage = imagediv.firstElementChild;
        oldImage.parentNode.replaceChild(newimage, oldImage);
    }
}

function imageLoaded() {
    let preview = document.querySelector("#preview");
    return preview.firstElementChild != null;
}

function enableExtractBtn() {
    extractBtn.disabled = false;
    extractBtn.classList.replace("btn-secondary", "btn-info")
}
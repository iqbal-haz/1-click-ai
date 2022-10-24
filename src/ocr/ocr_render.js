$("#extract").on("click", async () => {
    console.log("button clicked -> imageToText render");
    let data = new FormData();
    let image = $("#image")[0].files[0];
    data.append('image', image);
    
    for (let [k, v] of data) console.log(`${k}: ${v}`);

    let host = await getHost();
    console.log(host);
    console.log("test");
    axios.post(
        host + "/",
        data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
      ).then(({ data: result }) => {
        console.log(result);
      }).catch(console.error)
    await new Promise(resolve => setTimeout(resolve, 3000))
    // console.log(result);
    await new Promise(resolve => setTimeout(resolve, 3000))
    // axios.post(
    //     host + "/",
    //     data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         }
    // }).then((response) => {
    //     console.log('inside axios response');
    //     let { img_path, fulltxt } = response.data;
    //     console.log(response);
    //     result = fulltxt;
    // });
    // $.ajax({
    //     url: host + '/',
    //     type: 'POST',
    //     data: data,
    //     contentType: false,
    //     processData: false,
    //     success: function(response) {
    //         console.log('inside ajax success');
    //         console.log(response);
    //         let {img_path, fulltxt} = response;
    //         result = fulltxt;
    //     },
    //     error: function(error) {
    //         console.log(error);
    //     }
    // });
    console.log(result);
    document.querySelector("#result").innerHTML = await bounce(result);
});

/**
 * @param {*} content 
 * @returns the exact same thing passed in but has 
 * sent through the main process and wrapped in promise
 */
async function bounce(content) {
    console.log('inside bounce render');
    console.log(content);
    let result = window.bridge.bounce(content);
    return result;
}

async function getHost() {
    return await window.bridge.getHost();
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
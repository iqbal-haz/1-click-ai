// $("#extract").on("click", async () => {
//     console.log("button clicked -> imageToText render");
//     let data = new FormData();
//     let image = $("#image")[0].files[0];
//     data.append('image', image);
    
//     for (let [k, v] of data) console.log(`${k}: ${v}`);

//     let host = await getHost();
//     console.log(host);
//     console.log("test");
//     let result;

//     var settings = {
//         "url": "http://127.0.0.1:5000/",
//         "method": "POST",
//         "timeout": 0,
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//         "data": data,
//         "error": function(response) {
//             alert("error")
//         }
//     };

//     $.ajax(settings).done(function (response) {
//         alert("inside ajax");
//         console.log(response);
//         result = response;
//     });
//     console.log(result);
//     document.querySelector("#result").innerHTML = await bounce(result);
// });

const extractBtn = document.getElementById('extract')
extractBtn.addEventListener("click", function() {
    console.log("extact button clicked");
    let data = new FormData();
    let image = $("#image")[0].files[0];
    data.append('image', image);
    let result;

    // let ajaxPost = $.ajax("http://127.0.0.1:5000/", {
    //     method: "POST",
    //     data: data,
    //     mimeType: "multipart/form-data",
    //     contentType: false,
    //     processData: false,
    // });
    
    // result = ajaxPost.done(function(data) {
    //     console.log("inside done");
    //     console.log(data);
    // }).fail(function(jqxhr, textStatus, error) {
    //     console.log("inside fail");
    //     console.log(jqxhr);
    //     console.log(error);
    // }).always(function() {
    //     console.log("inside always");
    // });
    let axiosPost = axios.post("http://127.0.0.1:5000/", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    
    result = axiosPost.then(function(response) {
        console.log("inside axios then");
        console.log(response.data);
    });
    console.log(axiosPost);
    console.log(result);
});

/**
 * @param {*} content 
 * @returns the exact same thing passed in but has 
 * sent through the main process and wrapped in promise
 */
async function bounce(content) {
    console.log('inside bounce render');
    console.log(typeof content);
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
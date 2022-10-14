
$("#submit").on("click", function () {
    console.log("clicked > postData render");
    let formData = new FormData();
    let image = $("#image")[0].files[0];
    formData.append('image', image);
    console.log(formData);

    window.bridge.postData(formData);
});

window.bridge.showText((event, text) => {
    console.log("masuk showText render")
    $("#result").append(text)
});
$(document).ready(function () {
    $("#fileUpload").on("change", function () {
        var files = $(this).get(0).files;
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }

        uploadFiles(formData);
    })
})

function uploadFiles(formData) {
    $.ajax({
        url: "../api/FileUpload/UploadFiles",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str += "<img src='" + data[i] + "' height='100' width='100'>"
            }

            $(".file-upload-container").append(str);
        },
        error: function (data) {
            alert("Upload Failed!");
        }
    })
}
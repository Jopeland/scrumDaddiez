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
    var url = window.location.href;
    var classToShow = parseURLParams(url);

    $.ajax({
        url: "../api/FileUpload/UploadFiles",
        method: "POST",
        data: formData, classToShow,
        processData: false,
        contentType: false,
        success: function (data) {
            var str = "";

            for (var i = 0; i < data.length; i++) {
                if (data[i].includes(".docx") || data[i].includes(".pdf") || data[i].includes(".txt")) {                   
                    str = "File(s) successfully uploaded!"
                } else {
                    str += "<img src='" + data[i] + "' height='200' width='200'>" 
                }
            }                   

            $(".file-upload-container").append(str);
        },
        error: function (data) {
            alert("Upload Failed!");
        }
    })
}


// https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
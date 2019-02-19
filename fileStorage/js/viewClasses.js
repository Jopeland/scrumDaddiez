window.onload = function () {

    console.log("Loading Data");

    var webMethod = "fileStorageServices.asmx/ViewClasses";

    $.ajax({
        type: "GET",
        url: webMethod,
        success: function (data) {
            myObj = JSON.parse(this.responseText);
            txt += "<table border='1'>"
            for (x in myObj) {
                txt += "<tr><td>" + myObj[x].name + "</td></tr>";
            }
            txt += "</table>"
            document.getElementById("tableData").innerHTML = txt;
        
        },
        error: function (e) {
            alert("Error happens here");
            console.log(e);
        }
    })


}
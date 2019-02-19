window.onload = function () {
    document.getElementById("addClassButton").addEventListener("click", addClass);
}

function addClass() {

    var classID = document.getElementById("classID").value;
    var className = document.getElementById("className").value;
    var professorName = document.getElementById("profLName").value;

    console.log("Input received. Attempting to validate credentials.");

    var webMethod = "../fileStorageServices.asmx/AddClass";
    var parameters = "{\"classID\":\"" + encodeURI(classID) + "\",\"className\":\"" + encodeURI(className) + "\",\"professorName\":\"" + encodeURI(professorName) + "\"}";

    $.ajax({
        type: "POST",
        data: parameters,
        url: webMethod,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data === true)
                alert("Following class added:\nID: " + { classID } + "\nName: " + { className } + "\nProfessor: " + { professorName });
            if (data === false)
                alert("Class already exists. Will not add to database.");
        },
        error: function (e) {
            alert("Something went wrong");
            console.log(e);
        }
    })
}
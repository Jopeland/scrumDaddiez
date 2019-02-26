function load() {

    var webMethod = "../fileStorageServices.asmx/NumberOfClasses";

    $.ajax({
        type: "POST",
        data: "{\"admin\":\"true\"}",
        url: webMethod,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("Connection established.\n Data: ")
            console.log(data.d);

            if (data.d > 0) {
                $("#requestLink").append("(" + data.d + ")");
                console.log(data.d + "classes have been requested")
            }

            else
                console.log("No classes have been requested.");
        },
        error: function (e) {
            alert("Something went wrong");
            console.log(e);
        }
    })


    var admin;

    admin = sessionStorage.getItem('admin');

    if (admin == "True") {
        $("#adminLinks").show();
        $("#userLinks").hide();
    }
    else {
        $("#userLinks").show();
        $("#adminLinks").hide();
    }

    
}
window.onload = function () {

    console.log("Loading Data");

    $.ajax({
        type: "POST",
        url: "../fileStorageServices.asmx/viewClasses",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var returnData = data.d;

            console.log("Return data is" + returnData);

            if (returnData != null) {
                $("#tableData").append(returnData);
            }
            else {
                var errorMessage = "<p>No results found.  Click <a href='addClass.html'>here</a> to request a new class.</p>";
                $("#error").append(errorMessage);
            }
        },
        error: function (e) {
            window.alert("Something went wrong");
        }
    })


}
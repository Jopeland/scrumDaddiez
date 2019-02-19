$(document).ready(function () {
    $("#searchButton").click(function (event) {
        SearchDatabase();
    })
})

function SearchDatabase() {

    /* Deletes all table rows except for the header */
    $("#tableBody tr").remove();
    $("#error p").remove();

    var input = document.getElementById("input").value;

    console.log("Input is " + input);

    var searchTerm = "{\"input\":\"" + input + "\"}";

    console.log("Attempting search...");

    $.ajax({
        type: "POST",
        data: searchTerm,
        url: "../fileStorageServices.asmx/classSearch",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function(data){
            var returnData = data.d;

            console.log("Return data is" + returnData);

            if (returnData != null) {
                $("#tableBody").append(returnData);
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

window.onload = function () {

    console.log("Loading Data");

    $.ajax({
        type: "POST",
        url: "../fileStorageServices.asmx/viewRequests",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var returnData = data.d;

            console.log("Return data is: " + returnData)

            if (returnData != null) {
                $("#requests").append(returnData);
            }
            else {
                var errorMessage = "<p>No pending class requests.</p>";
                $("#requests").append(errorMessage);
            }
        },
        error: function (e) {
            window.alert("Something went wrong");
        }
    })

    /*event handlers set using table as a wrapper */
    $("#requests").on('click', 'input', function () {

        /* index saves the row index of the button */
        var index = $(this).closest('td').parent()[0].sectionRowIndex;

        /* The selected class is added */

        if (this.className == "approve") {
            manageRequest(index, true);
        }
        else if (this.className == "deny") {
            manageRequest(index, false);
        }
    })
}


function manageRequest(tableRow, approved) {

    /* Storing request table */
    var table = document.getElementById("requests");

    /* console tells the user if they are deleting or updating */
    if (approved === true) {
        console.log("Approving class");
    }
    else {
        console.log("Deleting request");
    }


    /* variables for row and column number to find parameters for asmx method */
    var classId = table.rows[tableRow].cells[0].innerHTML;
    var professorName = table.rows[tableRow].cells[2].innerHTML;

    var parameters = "{\"classID\":\"" + encodeURI(classId) + "\",\"professorName\":\"" + encodeURI(professorName) + "\",\"approved\":\"" + approved + "\"}";


    $.ajax({
        type: "POST",
        data: parameters,
        url: "../fileStorageServices.asmx/managePendingRequests",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var returnData = data.d;

            /* if return data is true, user is told row was updated.  If false row was deleted */
            if (returnData === true) {
                window.alert("Row approved!");
                location.reload(true); /*Window is forced to reload to show updated list of requests */
            }
            else {
                window.alert("Request removed");
                location.reload(true);
            }
        },
        error: function (e) {
            window.alert("Something went wrong");
        }
    })


    
}


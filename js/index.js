function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log("Input received. Attempting to validate credentials.");

    ValidateLogin(username, password);
}


function ValidateLogin(username, password){
    $.ajax({
        type: "GET",
        data: {username: username, password: password},
        url: "70.32.28.7/fileStorage/fileStorageServices.asmx.cs/VerifyCredentials",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function login(data){
            if (data === true){
                sessionStorage.setItem('login', 'true');
            }
            else {
                sessionStorage.setItem('login', "false");
            }

            if (sessionStorage.getItem("login" == "true")){
                document.location.href = "/html/account.html";
            }
            else{
                alert("Invalid credentials. Please try again.");
            }
        },
        error: function(xhr){
            alert(xhr.responseText);
        }
    })
}
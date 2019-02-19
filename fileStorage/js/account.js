function load() {
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
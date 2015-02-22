//handles authentication

var authenticateUrl = "/authenticate";

//sends ajax request to the /authenticate url
//if successful uses the access_token from the web service
var authenticate = function (successCallback) {
    sendRequest(authenticateUrl, "POST", {
        "grant_type": "password", username: model.username(), password: model.password()
    }, function (data) {
        model.authenticated(true);
        setAjaxHeaders({
            Authorization: "bearer " + data.access_token
        });
        if (successCallback) {
            successCallback();
        }
    });
};
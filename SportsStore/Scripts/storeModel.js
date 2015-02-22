

var model = {
    //observable array that will be used to store the product objects obtained from the server.
    products: ko.observableArray([]),

    //observable array that will be used to store the order objects obtained from the server
    orders: ko.observableArray([]),

    //true when a successful authentication request has been performed and will be false otherwise
    authenticated: ko.observable(false),

    //username entered by the user
    username: ko.observable(null),

    //password entered by the user
    password: ko.observable(null),

    //error string that will be displayed to the user when an Ajax request fails
    error: ko.observable(""),

    //true when a request fails and false when a request succeeds
    gotError: ko.observable(false)
};


$(document).ready(function () {
    ko.applyBindings();

    setDefaultCallbacks(function (data) {
        if (data) {
            console.log("---Begin Success---");
            console.log(JSON.stringify(data));
            console.log("---End Success---");
        } else {
            console.log("Success (no data)");
        }

        model.gotError(false);
    },
        function (statusCode, statusText) {
            console.log("Error: " + statusCode + " (" + statusText + ")");
            model.error(statusCode + " (" + statusText + ")");
            model.gotError(true);
        });
});

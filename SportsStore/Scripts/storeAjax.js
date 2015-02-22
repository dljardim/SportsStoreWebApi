

//url This property specifies the URL that the request will be sent to.
//verb This property specifies the HTTP verb for the request.
//data This property specifies the data for the request, which will be sent to the web service as a
//query string for GET requests and in the request body for other verbs.
//successCallback This property specifies a callback function that will be invoked if the Ajax request is successful
//and passed the data from the response.
//errorCallback This property specifies a callback function that will be invoked if the Ajax request is
//unsuccessful and passed the status code and explanatory text.
//options This property is used to set jQuery options for a single Ajax request.
var sendRequest = function (url, verb, data, successCallback, errorCallback, options) {
    

    var requestOptions = options || {};
    requestOptions.type = verb;
    requestOptions.success = successCallback;
    requestOptions.error = errorCallback;

    if (!url || !verb) {
        errorCallback(401, "URL and HTTP verb required");
    }

    if (data) {
        requestOptions.data = data;
        
        
    }
    $.ajax(url, requestOptions);
};

//allows the success and error callbacks to be set
var setDefaultCallbacks = function(successCallback, errorCallback) {
    $.ajaxSetup({
        complete: function(jqXHR, status) {
            if (jqXHR.status >= 200 && jqXHR.status < 300) {
                successCallback(jqXHR.responseJSON);
            } else {
                errorCallback(jqXHR.status, jqXHR.statusText);
            }
        }
    });
};


// todo: ajaxSetup ????
/// sets headers for ajax requests
var setAjaxHeaders = function(requestHeaders) {
    $.ajaxSetup({ headers: requestHeaders });
};

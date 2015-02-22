var adminModel = {
    //used to control the top level content displayed to the user - signin / admin display
    currentView : ko.observable("signin"),
    //flag to show products or orders
    listMode : ko.observable("products"),
    //gather details for new products that the user wants to add to the repository
    newProduct : { name : "" }
}
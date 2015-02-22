
/** Model that contains just the data and state required to manage teh customer client
 * 
 */
var customerModel = {
    //array of product category names used for filtering products
    productCategories: ko.observableArray([]),
    //contains the set of products that belong to the currently selected category
    filteredProducts: ko.observableArray([]),
    //currently selected category
    selectedCategory: ko.observable(null),
    //customers shopping cart contains products andd quantity of each
    cart: ko.observableArray([]),
    //total value of products in the cart
    cartTotal: ko.observable(0),
    //number of products in the cart
    cartCount: ko.observable(0),
    //which view the customer should be shown
    currentView: ko.observable("list")
}

/** storeOrdersController.js
 * 
 * define the functions that will support the views that present functionality to the customer
 * and operation on the application models
 * - both the common model
 * - and the one specific to the customer client
 */


var setCategory = function(category) {
    customerModel.selectedCategory(category);
    filterProductsByCategory();
};

var setView = function(view) {
    customerModel.currentView(view);
};

var addToCart = function(product) {
    var found = false;
    var cart = customerModel.cart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.Id == product.Id) {
            found = true;
            count = cart[i].count + 1;
            customerModel.cart.splice(i, 1);
            customerModel.cart.push({
                count : count,
                product : product
            });
            break;
        }
    }

    if (!found) {
        customerModel.cart.push({ count : 1, product : product });
    }

    setView("cart");
};

var removeFromCart = function(productSelection) {
    customerModel.cart.remove(productSelection);
};

var placeOrder = function() {
    var order = {
        Customer : model.username(),
        Lines : customerModel.cart().map(function(item) {
            return {
                Count : item.count,
                ProductId : item.product.Id
            };
        })
    };

    saveOrder(order, function() {
        setView("thankyou");
    });
};


// Knockout subscribe functions -
// Define functions that are called automatically when there are changes to observable data items

model.products.subscribe(function(newProducts) {

    filterProductsByCategory();

    customerModel.productCategories.removeAll();
    customerModel.productCategories.push.apply(customerModel.productCategories,
        model.products().map(function(p) {
            return p.Category;
        })
        .filter(function(value, index, self) {
            return self.indexOf(value) === index;
        }).sort());
});

customerModel.cart.subscribe(function(newCart) {

    customerModel.cartTotal(newCart.reduce(
        function(prev, item) {
            return prev + (item.count * item.product.Price);
        }, 0));

    customerModel.cartCount(newCart.reduce(
        function(prev, item) {
            return prev + item.count;
        }, 0));
});


var filterProductsByCategory = function() {
    var category = customerModel.selectedCategory();

    customerModel.filteredProducts.removeAll();
    customerModel.filteredProducts.push.apply(customerModel.filteredProducts,
        model.products().filter(function(p) {
            return category == null || p.Category == category;
        }));
};
$(document).ready(function() {
    getProducts();
});
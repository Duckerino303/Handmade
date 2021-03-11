var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var middleware = require("../middleware");
const middlewareObj = require("../middleware");

// INDEX - Products page
router.get("/", function(req, res){
	// Getting all products from the database
	Product.find({}, function(err, products){
		if(err) {
			console.log(err);
		} else {
			res.render("products/index", {products: products, currentUser: req.user});
		}
	});
    
});


// CREATE - creating a new product
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
    var newProduct = {name: name, image: image, description: desc, author: author};
    Product.create(newProduct, function(err, product){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/products");
		}
	});
});


// NEW - a form to add a new product to the database
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("products/new");
});

// SHOW - show specific informationa about one specific product
router.get("/:id", function(req, res){
	Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
		if(err) {
			console.log(err);
		} else {
			res.render("products/show", {product: foundProduct});
		}
	});
});

// EDIT PRODUCT ROUTE
router.get("/:id/edit", middleware.checkProductOwnership, function(req, res){
	Product.findById(req.params.id, function(err, foundProduct) {
		res.render("products/edit", {product: foundProduct});
	});
});

// UPDATE PRODUCT ROUTE

router.put("/:id", middleware.checkProductOwnership, function(req, res){
	Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
		if(err) {
			console.log(err);
			res.redirect("/products");
		} else {
			res.redirect("/products/" + req.params.id);
		}
	});
});

// DESTROY PRODUCT ROUTE
router.delete("/:id", middleware.checkProductOwnership, function(req, res){
	Product.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/products");
		} else {
			res.redirect("/products");
		}
	});
});

module.exports = router;
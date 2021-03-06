var express = require("express");
var router = express.Router({mergeParams: true});
var Product = require("../models/product");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// NEW COMMENT ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {product: product});		
		}
	});
	
});

// CREATE COMMENT ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
			res.redirect("/products");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					req.flash("error", "Something went wrong!");
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					product.comments.push(comment);
					product.save();
					req.flash("success", "Successfully added comment!");
					res.redirect("/products/" + product._id);
				}
			});
		}
	});
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership,  function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {product_id: req.params.id, comment: foundComment});
		}
	});
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/products/" + req.params.id);
		}
	});
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err) {
			res.redirect("/products/" + req.params.id);
		} else {
			req.flash("success", "Comment successfully deleted!");
			res.redirect("/products/" + req.params.id);
		}
	});
});

module.exports = router;
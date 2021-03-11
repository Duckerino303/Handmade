var mongoose = require("mongoose");
var Product = require("./models/product");
var Comment = require("./models/comment");

var data = [
	{
	name: "Wooden Ring",
	image: "https://i.etsystatic.com/10776932/r/il/445429/1141197041/il_570xN.1141197041_oshy.jpg",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lorem ut orci varius consectetur. Etiam in dolor dolor. Integer porta ac diam eu vestibulum. Duis fermentum pharetra lectus ac ullamcorper. Integer eget magna eget magna tincidunt semper vitae vel arcu. Fusce hendrerit, est id pellentesque gravida, quam quam convallis purus, ut vehicula sapien erat a dui. Fusce semper faucibus vulputate. Sed porttitor viverra neque non pretium. Sed ac odio vitae justo accumsan elementum sit amet ut tortor. Vestibulum vitae dignissim libero, id malesuada diam. Morbi nec risus in erat scelerisque congue. Nunc id augue vitae turpis vehicula cursus vel at odio. Maecenas dui odio, fringilla tincidunt ex vel, luctus semper nisl. Maecenas ligula dolor, lacinia non ligula a, tempus lacinia nulla."
	},
	{
	name: "Resin Ring",
	image: "https://i.etsystatic.com/11499829/r/il/1662e5/1901680644/il_570xN.1901680644_6rwo.jpg",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lorem ut orci varius consectetur. Etiam in dolor dolor. Integer porta ac diam eu vestibulum. Duis fermentum pharetra lectus ac ullamcorper. Integer eget magna eget magna tincidunt semper vitae vel arcu. Fusce hendrerit, est id pellentesque gravida, quam quam convallis purus, ut vehicula sapien erat a dui. Fusce semper faucibus vulputate. Sed porttitor viverra neque non pretium. Sed ac odio vitae justo accumsan elementum sit amet ut tortor. Vestibulum vitae dignissim libero, id malesuada diam. Morbi nec risus in erat scelerisque congue. Nunc id augue vitae turpis vehicula cursus vel at odio. Maecenas dui odio, fringilla tincidunt ex vel, luctus semper nisl. Maecenas ligula dolor, lacinia non ligula a, tempus lacinia nulla."
	},
	{
	name: "Meteorite Ring",
	image: "https://i0.wp.com/decazicustomrings.com/wp-content/uploads/2019/10/DSC09254.jpg?fit=1543%2C1543&ssl=1",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lorem ut orci varius consectetur. Etiam in dolor dolor. Integer porta ac diam eu vestibulum. Duis fermentum pharetra lectus ac ullamcorper. Integer eget magna eget magna tincidunt semper vitae vel arcu. Fusce hendrerit, est id pellentesque gravida, quam quam convallis purus, ut vehicula sapien erat a dui. Fusce semper faucibus vulputate. Sed porttitor viverra neque non pretium. Sed ac odio vitae justo accumsan elementum sit amet ut tortor. Vestibulum vitae dignissim libero, id malesuada diam. Morbi nec risus in erat scelerisque congue. Nunc id augue vitae turpis vehicula cursus vel at odio. Maecenas dui odio, fringilla tincidunt ex vel, luctus semper nisl. Maecenas ligula dolor, lacinia non ligula a, tempus lacinia nulla."
	}
]

function seedDB() {
	Product.remove({}, function(err){
		if(err) {
			console.log(err);
		}
		console.log("Removed products!");
		data.forEach(function(seed){
			Product.create(seed, function(err, product){
				if(err){
					console.log(err);
				} else {
					console.log("Product added!");
					Comment.create({
						text: "Such a beautiful creation!",
						author: "Doggo"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							product.comments.push(comment);
							product.save();
							console.log("Created new comment");
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;

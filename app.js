var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	flash		= require("connect-flash"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override")
	Product 	= require("./models/product"),
	Comment 	= require("./models/comment"),
	User 		= require("./models/user"),
	seedDB		= require("./seeds");

var commentRoutes 	= require("./routes/comments"),
	productRoutes 	= require("./routes/products"),
	indexRoutes 	= require("./routes/index");

var serverPort = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost/handmade", {
	useNewUrlParser: true ,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); // seed the database

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "littleSecret",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);

app.listen(serverPort, function(){
    console.log("The Handmade Market server has been started and is listening on port: " + serverPort);
});


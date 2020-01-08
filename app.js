var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    User            = require("./models/user"),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    seedDB          = require('./seed');

var campgroundsRoute    = require("./routes/campgrounds"),
    commentsRoute       = require("./routes/comments"),
    indexRoute          = require("./routes/index");

const PORT  = process.env.PORT || 3000;
const IP    = process.env.IP || "localhost";
var url = "mongodb+srv://saif:ads$poi@cluster0-vofit.mongodb.net/test?retryWrites=true&w=majority";
// "mongodb://localhost:27017/yelp_camp"
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
mongoose.connect(url, {useNewUrlParser: true});
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "some random string goes here",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this middleware is used inside every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campground", campgroundsRoute);
app.use("/campground/:id/comment", commentsRoute);
app.use("/", indexRoute);

app.listen(PORT, IP, function(){
    console.log("Yelpcamp Project started");
});
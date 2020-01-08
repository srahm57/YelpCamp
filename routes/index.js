var express     = require('express');
var router = express.Router();
var User        = require("../models/user");
var passport    = require('passport');

router.get("/", function(req, res){
    res.render("home");
});  

//Auth routes
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome, "+ user.username+"!");
            res.redirect("/campground");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate('local',
    {
        successRedirect: "/campground",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/campground");
});

module.exports = router;
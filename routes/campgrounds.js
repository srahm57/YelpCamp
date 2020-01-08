var express     = require('express');
var router = express.Router();
var Campground  = require('../models/campground');
var middleware  = require('../middleware'); //there only one file inside, it uses that

router.get("/", function(req, res){
    Campground.find({}, function(err,campgrounds){
        if(err) console.log(err);
        else res.render("campgrounds/index", {campgrounds:campgrounds});
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name:name, image:image, price:price, description:desc, author:author};
    //campgrounds.push({name: name, image: image});
    //Create new campground and save to db
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground"); //def redirects as a GET request
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err) console.log(err);
        else res.render("campgrounds/show", {campground:foundCamp});
    });
});

//Edit & Update
router.get("/:id/edit", middleware.checkCampgroundAuthorization, function(req, res){
    Campground.findById(req.params.id, function(err, campground){ //NOT _id here
        if(err) console.log(err);
        else{
            res.render("campgrounds/edit", {campground:campground});
        }
    });
});

router.put("/:id", middleware.checkCampgroundAuthorization, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else res.redirect("/campground/"+req.params.id);
    });
});

// Destroy camp route
router.delete("/:id", middleware.checkCampgroundAuthorization, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) console.log(err);
        res.redirect("/campground");
    });
});

module.exports = router;
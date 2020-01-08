var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
var middlewareObj = {};

//middleware for checking login
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkCommentAuthorization = function(req, res, next){
    if(req.isAuthenticated()){ //is user is logged in
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) res.redirect("back");
            else{
                if(foundComment.author.id.equals(req.user._id)){ //user authorized
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundAuthorization  = function(req, res, next){
    if(req.isAuthenticated()){ //is user is logged in
        Campground.findById(req.params.id, function(err, campground){
            if(err) res.redirect("back");
            else{
                if(campground.author.id.equals(req.user._id)){ //user authorized
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to logged in to do that");
        res.redirect("back");
    }
}

module.exports = middlewareObj;
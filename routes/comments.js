var express     = require('express');
var router = express.Router({mergeParams: true});
var Campground  = require('../models/campground');
var Comment  = require('../models/comment');
var middleware  = require('../middleware'); //there only one file inside, it uses that

router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) console.log(err);
        else res.render("comments/new", {campground:campground});
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err) console.log(err);
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success", "Thanks for the review!");
                    res.redirect("/campground/"+req.params.id);
                }
            });
        }
    });
});

//Edit and Update comments
//we use :comment_id to differentiate from :id before
router.get("/:comment_id/edit", middleware.checkCommentAuthorization, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) res.redirect("back");
        else{
            res.render("comments/edit", 
                        {campground_id: req.params.id, comment:foundComment});
        }
    });
})

router.put("/:comment_id", middleware.checkCommentAuthorization, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) res.redirect("back");
        else res.redirect("/campground/"+req.params.id);
    });
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentAuthorization, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        req.flash("success", "Comment Deleted");
        res.redirect("back");
    });
});

module.exports = router;
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {name : "Great Dunes", image : "https://theknow.denverpost.com/wp-content/uploads/2018/09/Great-Sand-Dunes-rj-2957-1080x676.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl dui, ultrices id ipsum vel, tincidunt efficitur tellus. Mauris id interdum neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus blandit ultrices justo lacinia rutrum. Praesent vitae nunc est. Sed sit amet dolor nec lacus dapibus feugiat in a dui. Curabitur rhoncus faucibus vulputate. Vivamus quis rhoncus nisi, quis fermentum dolor. Morbi vitae arcu ante. "},

    {name : "Pearl park", image : "https://theknow.denverpost.com/wp-content/uploads/2019/02/TR12STATEPARKS_P1050862.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl dui, ultrices id ipsum vel, tincidunt efficitur tellus. Mauris id interdum neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus blandit ultrices justo lacinia rutrum. Praesent vitae nunc est. Sed sit amet dolor nec lacus dapibus feugiat in a dui. Curabitur rhoncus faucibus vulputate. Vivamus quis rhoncus nisi, quis fermentum dolor. Morbi vitae arcu ante. "},

    {name : "Trekker Paradise", image : "https://wordpress.accuweather.com/wp-content/uploads/2019/03/camping-thumbnail.11.4920AM-1.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl dui, ultrices id ipsum vel, tincidunt efficitur tellus. Mauris id interdum neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus blandit ultrices justo lacinia rutrum. Praesent vitae nunc est. Sed sit amet dolor nec lacus dapibus feugiat in a dui. Curabitur rhoncus faucibus vulputate. Vivamus quis rhoncus nisi, quis fermentum dolor. Morbi vitae arcu ante. "},

    {name : "Lost Creek", image : "https://wordpress.accuweather.com/wp-content/uploads/2019/03/crater-lake-camping.20.4620AM.png",
    description: "Dunes to behold"},

    {name : "Rosemite", image : "https://9srj21ymbn5655ke1piiiiqp-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Most_Beautiful_Camping_Destinations.jpg",
    description: "Dunes to behold"}
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) console.log(err);
        else{
            console.log("Removed all camps");
    //Create campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err) console.log(err);
                    else {
                        console.log("added a camp");
                        Comment.create({
                                text: "This place is great!",
                                author: "Lisa"
                            }, function(err, comment){
                                if(err) console.log(err);
                                else{
                                    data.comments.push(comment);
                                    data.save();
                                    console.log("\t comment added");
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
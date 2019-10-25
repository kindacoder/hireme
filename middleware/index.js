var User = require("../models/User");

//middleware to check if the candidate is loggedin or not ?
module.exports = {
    isLoggedIn: function(req, res, next) {
        // console.log(req.user);
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        //alert("Must signed to that");
        res.redirect("/");
    },


}
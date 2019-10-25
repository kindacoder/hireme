var User = require("../models/User");
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
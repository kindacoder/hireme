var express = require("express");
var router = express.Router();
//login
router.get("/login", function(req, res) {
    res.render("login");
});

//register
router.get("/register", function(req, res) {
    res.render("signup");
});






module.exports = router;
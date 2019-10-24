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

router.get('/', function(req, res) {
    res.render('user/dashboard');
})






module.exports = router;
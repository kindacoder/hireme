var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
require("../models/Job")
const Job = mongoose.model('job');
//login
router.get("/login", function(req, res) {
    res.render("login");
});

//register
router.get("/register", function(req, res) {
    res.render("signup");
});

router.get('/', function(req, res) {
    Job.find({}, function(err, data) {
        res.render('user/dashboard', { jobs: data });
    })
})






module.exports = router;
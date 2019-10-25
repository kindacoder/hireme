var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require("../models/Job")

const Job = mongoose.model('job');
require("../models/User")
const User = mongoose.model('user');


//login get
router.get("/login", function(req, res) {
    res.render("login");
});

//login post

router.post("/login", function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

//signup get
router.get("/signup", function(req, res) {
    res.render("signup");
});

//signup post
router.post("/signup", function(req, res) {
    if (req.body.password != req.body.password2) {
        req.flash('error_msg', 'Sorry, your password didn\'t match');
        res.redirect('/users/signup')
    } else {
        var isHr = false;
        if (req.body.hr == 'on') {
            isHr = true;
        }
        const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isHr: isHr
            })
            //encrypting the password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                // Storing hash in my password DB.
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'Succesfully signed up');
                        res.redirect('/users/login')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        });


    }

});


router.get('/', function(req, res) {
    Job.find({}, function(err, data) {
        res.render('user/dashboard', { jobs: data });
    })
})






module.exports = router;
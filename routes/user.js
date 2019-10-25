var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const middleware = require('../middleware/index');
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

    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            req.flash('error_msg', 'No user found for this email');
            res.redirect('/users/login');
        } else if (err) {
            req.flash('error_msg', 'No user found for this email');
            res.redirect('/users/login');
        } else if (user.isHr == true) {
            passport.authenticate('local', {
                successRedirect: '/hr/postjob',
                failureRedirect: '/users/login',
                failureFlash: true
            })(req, res, next);
        } else {
            passport.authenticate('local', {
                successRedirect: '/users',
                failureRedirect: '/users/login',
                failureFlash: true
            })(req, res, next);
        }
    })

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

//user dashboard
router.get('/', middleware.isLoggedIn, function(req, res) {
    Job.find({}, function(err, data) {
        res.render('user/dashboard', { jobs: data });
    })
})

//user profile
router.get('/profile/:id', function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            res.render('user/profile', { user: user })
        }
    })
})


//applying to the jobs
router.get('/apply/:id', function(req, res) {
    //search in the job list
    Job.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { appliedUser: req.user.id } }, function(err, job) {
        if (err) {
            console.log(err);
        } else {
            req.flash('success_msg', "You have applied for that job. Checkout new Jobs");
            res.redirect('/users');

        }
    })

})




//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})


module.exports = router;
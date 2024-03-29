//requirign mongoose
const mongoose = require('mongoose');
const middleware = require('../middleware/index'); //middleware to check if the user is logged in or not ?

//Loading the models
require("../models/Job")
require("../models/User")

//models
const User = mongoose.model('user');
const Job = mongoose.model('job');

//reqire express
var express = require("express");
var router = express.Router();

//job form
router.get("/postjob", middleware.isLoggedIn, function(req, res) {
    User.findOne({ email: req.user.email }, function(err, user) {
        if (user.isHr == true) {
            res.render('hr/form');
        } else {
            req.flash('error_msg', 'Only Hrs are allowed to use that route');
            res.redirect('/users')
        }
    })

});

//post route for posting a job

router.post('/postjob', middleware.isLoggedIn, function(req, res) {

    var newJob = new Job({
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        role: req.body.role,
        minsalary: req.body.minsalary,
        maxsalary: req.body.maxsalary,
        skills: req.body.skills,
        minex: req.body.minex,
        date: req.body.date,
        expirydate: req.body.expirydate,
        companydetails: req.body.companydetails,
        user: req.user.id
    })

    newJob.save(function(err, resp) {
        if (err) {
            console.log(err);
            res.send('something went wrong')
        } else {
            req.flash('success_msg', 'Job successfully posted');
            res.redirect('/hr/viewjobs');
        }
    })
})


//view jobs 
router.get('/viewjobs', middleware.isLoggedIn, function(req, res) {
    Job.find({ user: req.user.id }, function(err, job) {
        res.render('hr/viewjobs', { jobs: job });
    })
})

//view users who have applied for the job
router.get('/applications/:id', middleware.isLoggedIn, function(req, res) {

    // if (req.params.id.match('/^[0-9a-fA-F]{24}$/')) { //objectId reference Error
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    Job.findById({ _id: req.params.id }, function(err, job) {
        if (err) {
            console.log(err);
            req.flash('error_msg', 'Some error occured');
            res.redirect('/hr/viewjobs');
        } else {
            res.render('hr/applicants', { applicants: job.appliedUser });
        }
    })
})

module.exports = router;
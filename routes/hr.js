const mongoose = require('mongoose');
const middleware = require('../middleware/index');
require("../models/Job")
require("../models/User")
const User = mongoose.model('user');

const Job = mongoose.model('job');
var express = require("express");
var router = express.Router();
//post a job
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
            res.send('data saved')
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
                var applicantsArray = [];
                // job.appliedUser.forEach(function(applicant) {
                //     User.find({ _id: applicant }, function(err, user) {
                //         if (err) {
                //             console.log(err);
                //         } else {


                //         }

                //     })
                // })
                res.render('hr/applicants', { applicants: job.appliedUser });

            }
        })
        // }
})

module.exports = router;
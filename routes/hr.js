const mongoose = require('mongoose');
require("../models/Job")

const Job = mongoose.model('job');
var express = require("express");
var router = express.Router();
//post a job
router.get("/postjob", function(req, res) {
    res.render('hr/form');

});

router.post('/postjob', function(req, res) {

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
        companydetails: req.body.companydetails
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
module.exports = router;
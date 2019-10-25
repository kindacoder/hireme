const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("../models/User") //for reference
    //create schema
const jobSchema = new Schema({
    date: { type: Date, default: Date() }, //date posted
    expirydate: { type: Date, required: true }, //expiry date of the job
    name: { type: String, required: true }, //name of the company
    companydetails: { type: String, required: true }, //details of the company
    address: { type: String, required: true }, //address of the company
    role: { type: String, required: true }, //role of the job
    city: { type: String, required: true }, //city of the company
    minsalary: { type: Number, required: true }, //minimum salary provided by the employer
    maxsalary: { type: Number, required: true }, //maximum salary provided by the employer
    skills: { type: Array, required: true }, //skills required
    minex: { type: Number, required: true }, //minimum experience required
    appliedUser: [{ type: Schema.Types.ObjectId, ref: 'users' }], //list of the users applied for the job
    user: { type: String, required: true } //current user


})
const Jobs = mongoose.model('job', jobSchema);
module.exports = Jobs;
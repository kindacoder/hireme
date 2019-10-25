const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create schema
const jobSchema = new Schema({
    date: { type: Date, default: Date() },
    expirydate: { type: Date, required: true },
    name: { type: String, required: true },
    companydetails: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
    city: { type: String, required: true },
    minsalary: { type: Number, required: true },
    maxsalary: { type: Number, required: true },
    skills: { type: Array, required: true },
    minex: { type: Number, required: true },
    //minex=minimum experience required for the job,
    ///save the hr who is posting the jobs
    // user: { type: Schema.Types.ObjectId, ref: 'users' }

})
const Jobs = mongoose.model('job', jobSchema);
module.exports = Jobs;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create schema
const userSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, reuired: true },
    isHr: { type: Boolean, required: true }

})
const Users = mongoose.model('user', userSchema);
module.exports = Users;
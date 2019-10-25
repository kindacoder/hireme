const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create schema
const userSchema = new Schema({

    name: { type: String, required: true }, //name
    email: { type: String, required: true }, //email
    password: { type: String, reuired: true }, //password
    isHr: { type: Boolean, required: true } //is the user HR or not ?

})
const Users = mongoose.model('user', userSchema);
module.exports = Users;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: -1
    },
    fullname: String,
    country: String,
    bio: String,
    social: String
});

module.exports = mongoose.model('user', UserSchema);

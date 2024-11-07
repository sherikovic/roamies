const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShareSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Buffer,
        required: true
    }
});

module.exports = mongoose.model('share', ShareSchema);
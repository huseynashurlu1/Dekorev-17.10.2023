const mongoose = require('mongoose'); 

var settingsSchema = new mongoose.Schema({
    aboutText: {
        type: String,
        required: true,
    },
    aboutImage: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Settings', settingsSchema);
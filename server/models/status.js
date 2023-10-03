const mongoose = require('mongoose'); 

var statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Status', statusSchema);
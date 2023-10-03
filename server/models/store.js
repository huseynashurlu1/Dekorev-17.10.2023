const mongoose = require('mongoose'); 

var storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        default: 0, 
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    workHours: {
        type: String,
        required: true,
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        default: '6516cc5a9347daf45f5b07d9'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
});

module.exports = mongoose.model('Store', storeSchema);
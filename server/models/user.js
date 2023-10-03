const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        enum: ['user', 'superAdmin'], 
        default: 'user' 
    },
}, {
    timestamps: true, 
});

module.exports = mongoose.model('User', userSchema);
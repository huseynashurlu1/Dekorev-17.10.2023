const mongoose = require('mongoose'); 

var branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required:true
    },
});

branchSchema.index({ storeId: 1 });


module.exports = mongoose.model('Branch', branchSchema);
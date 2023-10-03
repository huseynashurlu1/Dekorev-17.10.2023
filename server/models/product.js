const mongoose = require('mongoose'); 

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
            isMain: {
                type: Boolean,
                default: false,
            },
        },
    ],
    isDiscounted: {
        type: Boolean,
        required: true 
    },
    discountedPrice: {
        type: Number,
        required: true 
    },
    isNew: {
        type: Boolean,
        required: true 
    },
    isVIP: {
        type: Boolean,
        required: true        
    },
   
    hasShipping: {
        type: Boolean,
        required: true 
    },
    city: {
        type: String,
        required: true 
    },
    viewCount: {
        type: Number,
        default: 0, 
    },
    createDate:{
        type: String, 
        required:true,
        default: () => new Date().toISOString().substring(0, 10)
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required:true
    },
});

module.exports = mongoose.model('Product', productSchema);
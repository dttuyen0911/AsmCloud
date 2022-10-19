const mongoose = require('mongoose');
// var validator = require("price-validator");

var productSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: 'This field is required'
    },
    Price:{
        type: Number,
        required: true
    },
    Image:{
        type: String,
        default: true
    },
    Description:{
        type: String,
        required: true
    },
})
// productSchema.path('price').validate((val) => {
//     return validator.validate(val);
// }, 'Invalid price');

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');
// var validator = require("price-validator");

var productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        default: true
    },
    description:{
        type: String,
        required: true
    },
})
// productSchema.path('price').validate((val) => {
//     return validator.validate(val);
// }, 'Invalid price');

mongoose.model('Product', productSchema);
const mongoose = require('mongoose');
var validator = require("price-validator");
var productSchema = new mongoose.Schema({
    Name:{
        type: String,
       
        required: 'This field is required'
    },
    Price:{
        type: Number,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now()
    }
})
productSchema.path('price').validate((val) => {
    return validator.validate(val);
}, 'Invalid price');
mongoose.model('Product', productSchema);
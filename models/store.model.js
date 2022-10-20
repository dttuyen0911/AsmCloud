const mongoose = require('mongoose');
// var validator = require("price-validator");

var storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    address:{
        type: Number,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
})
mongoose.model('Store', storeSchema);
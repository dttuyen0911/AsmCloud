const mongoose = require('mongoose');
// var validator = require("price-validator");

var storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    address:{
        type: String,
    },
    telephone:{
        type: String,
    },
})
mongoose.model('Store', storeSchema);
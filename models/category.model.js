const mongoose = require('mongoose');
// var validator = require("price-validator");

var catSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    description:{
        type: String,
    },
})
mongoose.model('Category', catSchema);
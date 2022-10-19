const mongoose = require('mongoose');

const url = "mongodb+srv://dttuyen0911:09112002dtt@cluster0.mbo8o9h.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./employee.model');

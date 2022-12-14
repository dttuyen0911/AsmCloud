require('./models/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const userController = require('./controller/userController');
const productController = require('./controller/productController');
// const storeController = require('./controller/storeController');
// const categoryController = require('./controller/categoryController');

var app = express();
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views'))

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.get('/home', function (req, res) {
    res.render('base');
})  

app.set('view engine', 'hbs');

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
})

app.use('/user', userController);
app.use('/product', productController);
// app.use('/store', storeController);
// app.use('/category', categoryController);

const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product.model');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("product/addOrEditP", {
        viewTitle: "Insert Product"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var product = new Product();
    product.Name = req.body.Name;
    product.Price = req.body.Price;
    product.Image = req.body.Image;
    product.Description = req.body.Description;

    product.save((err, doc) => {
        if (!err) {
            res.redirect('product/listP');
        }
        else {
            if (err.Name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addOrEditP", {
                    viewTitle: "Insert Product",
                    product: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('product/listP');
        }
        else {
            if (err.Name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("product/addOrEditP", {
                    viewTitle: 'Update Product',
                    product: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/listP', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/listP", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/addOrEditP", {
                viewTitle: "Update Product",
                product: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product/listP');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'Name':
//                 body['NameError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

module.exports = router;
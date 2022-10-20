const express = require('express');
const mongoose = require('mongoose');
const Store = mongoose.model('Store');
// const Store = require('../models/store.model');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("store/addOrEditStore", {
        viewTitle: "Insert Store"
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
    var store = new Store();
    store.name = req.body.name;
    store.address = req.body.address;
    store.telephone = req.body.telephone;

    store.save((err, doc) => {
        if (!err) {
            res.redirect('store/listStore');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("store/addOrEditStore", {
                    viewTitle: "Insert Store",
                    store: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Store.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('store/listStore');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("store/addOrEditStore", {
                    viewTitle: 'Update Store',
                    store: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/listStore', (req, res) => {
    Store.find((err, docs) => {
        if (!err) {
            res.render("store/listStore", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Store.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("store/addOrEditStore", {
                viewTitle: "Update Store",
                store: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Store.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/store/listStore');
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
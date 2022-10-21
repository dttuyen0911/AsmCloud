const express = require('express');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("category/addOrEditCate", {
        viewTitle: "Insert Category"
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
    var category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;

    category.save((err, doc) => {
        if (!err) {
            res.redirect('category/listCate');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("category/addOrEditCate", {
                    viewTitle: "Insert Category",
                    category: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Category.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('category/listCate');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("category/addOrEditCate", {
                    viewTitle: 'Update Category',
                    category: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/listCate', (req, res) => {
    Category.find((err, docs) => {
        if (!err) {
            res.render("category/listCate", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("category/addOrEditCate", {
                viewTitle: "Update Category",
                category: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/category/listCate');
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
const ProductController = require('../models/product.model.js');

exports.create = (req, res) => {
    console.log("product",req)
    console.log("prod2",req.body)
    // Validate request
    // if(!req.body.productname) {
    //     return res.status(400).send({
    //         message: "product can not be empty"
    //     });
    // }
    const note = new ProductController({
        
        productname: "monitor",
        price: 333, 
        description:"created product"
    });

    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error occurred while creating the product."
        });
    });
};
exports.findAll = (req, res) => {
    ProductController.find()
    .then(productall => {
        res.send(productall);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving prod."
        });
    });
};
exports.findOne = (req, res) => {
    ProductController.findById(req.params.prodId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "prod not found with id " + req.params.prodId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "prod not found with id " + req.params.prodId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.prodId
        });
    });
};
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "prod content can not be empty"
        });
    }
    ProductController.findByIdAndUpdate(req.params.prodId, {
        title: req.body.title || "Untitled prod",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "prod not found with id " + req.params.prodId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "prod not found with id " + req.params.prodId
            });                
        }
        return res.status(500).send({
            message: "Error updating prod with id " + req.params.prodId
        });
    });
};
exports.delete = (req, res) => {
    ProductController.findByIdAndRemove(req.params.prodId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "product not found with id " + req.params.prodId
            });
        }
        res.send({message: "product deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.prodId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.prodId
        });
    });
};
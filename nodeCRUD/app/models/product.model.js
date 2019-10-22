const mongoose = require('mongoose');

const Product = mongoose.Schema({
    productname: String,
    price: Number,
    description: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Productnames', Product);
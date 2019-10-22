module.exports = (app) => {
    const Productnames = require('../controller/product.controller.js');

    
   app.post('/CreateProduct', Productnames.create);

   app.get('/GetAllProducts', Productnames.findAll);

   app.get('/GetOneProduct/:prodId', Productnames.findOne);

    app.put('/UpdateProduct/:prodId', Productnames.update);

    app.delete('/DeleteProduct/:prodId', Productnames.delete);
}
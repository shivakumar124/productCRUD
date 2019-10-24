const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectId

app.get('/', function(req, res, next) {
	req.db.collection('users').find().sort({"_id": -1}).toArray(function(err, result) {
		if (err) {
			req.flash('error', err)
			res.render('productData/list', {
				title: 'Product List', 
				data: ''
			})
		} else {
			res.render('productData/list', {
				title: 'Product List', 
				data: result
			})
		}
	})
})

app.get('/add', function(req, res, next){	
	res.render('productData/add', {
		title: 'Add New Product',
		name: '',
		price: '',
		description: ''		
	})
})

app.post('/add', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           
	req.assert('price', 'price is required').notEmpty()           
    req.assert('description', 'A valid description is required').notEmpty()  

    var errors = req.validationErrors()
    
    if( !errors ) {   
		var user = {
			name: req.sanitize('name').escape().trim(),
			price: req.sanitize('price').escape().trim(),
			description: req.sanitize('description').escape().trim()
		}
				 
		req.db.collection('users').insert(user, function(err, result) {
			if (err) {
				req.flash('error', err)
				
				res.render('productData/add', {
					title: 'Add New Product',
					name: user.name,
					price: user.price,
					description: user.description					
				})
			} else {				
				req.flash('success', 'Product added successfully!')
				
				res.redirect('/products')
				
			
			}
		})		
	}
	else {  
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
	
        res.render('productData/add', { 
            title: 'Add New Product',
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })
    }
})

app.get('/edit/(:id)', function(req, res, next){
	console.log("222222222222222")
	var o_id = new ObjectId(req.params.id)
	req.db.collection('users').find({"_id": o_id}).toArray(function(err, result) {
		if(err) return console.log(err)
		
		if (!result) {
			req.flash('error', 'User not found with id = ' + req.params.id)
			res.redirect('/products')
		}
		else { 
			res.render('productData/edit', {
				title: 'Edit Product Details', 
				id: result[0]._id,
				name: result[0].name,
				price: result[0].price,
				description: result[0].description					
			})
		}
	})	
})

app.put('/edit/(:id)', function(req, res, next) {
	req.assert('name', 'Name is required').notEmpty()          
	req.assert('price', 'price is required').notEmpty()            
    req.assert('description', 'A valid description is required').notEmpty()  

    var errors = req.validationErrors()
    
    if( !errors ) {   
		var user = {
			name: req.sanitize('name').escape().trim(),
			price: req.sanitize('price').escape().trim(),
			description: req.sanitize('description').escape().trim()
		}
		
		var o_id = new ObjectId(req.params.id)
		req.db.collection('users').update({"_id": o_id}, user, function(err, result) {
			if (err) {
				req.flash('error', err)
				
			
				res.render('productData/edit', {
					title: 'Edit Product Details',
					id: req.params.id,
					name: req.body.name,
					price: req.body.price,
					description: req.body.description
				})
			} else {
				req.flash('success', 'Product updated successfully!')
				
				res.redirect('/products')
				
			
			}
		})		
	}
	else {
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
        res.render('productData/edit', { 
            title: 'Edit Product Details',            
			id: req.params.id, 
			name: req.body.name,
			price: req.body.price,
			description: req.body.description
        })
    }
})


app.delete('/delete/(:id)', function(req, res, next) {	
	var o_id = new ObjectId(req.params.id)
	req.db.collection('users').remove({"_id": o_id}, function(err, result) {
		if (err) {
			req.flash('error', err)
			
			res.redirect('/products')
		} else {
			req.flash('success', 'Product deleted successfully! id = ' + req.params.id)
			
			res.redirect('/products')
		}
	})	
})

module.exports = app

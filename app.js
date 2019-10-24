const express = require('express')
const app = express()

const expressMongoDb = require('express-mongo-db');

const config = require('./config')
app.use(expressMongoDb(config.database.url));


app.set('view engine', 'ejs')

const index = require('./routes/index')
// var product = require('./routes/products')

const product=require('./routes/products')
const expressValidator = require('express-validator')
app.use(expressValidator())


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



var methodOverride = require('method-override')

 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	// cookie: { maxprice: 60000 }
}))
app.use(flash())

app.use('/', index)
app.use('/products', product)

app.listen(3002, function(){
	console.log('Server running at port 3002: http://127.0.0.1:3002')
})

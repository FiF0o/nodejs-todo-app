/**
 * Created by jonlazarini on 05/01/17.
 */
var express = require('express')
var path = require('path')
// persists data
//todo switch to redis for memory cache, etc..
var session = require('express-session')
var toDoController = require('./controllers/toDoController')
var registerController = require('./controllers/registerController')


/**
 * app config
 * */
var PORT = 3000
var VIEWS = 'views'
var staticFiles = 'public'
var secret = require('./config/tokens/secret')


/**
 *  START APP CODE
*/
// creates server
var app = express()

// set up view engine for server-side rendering using ejs templating
app.set('views', path.join(__dirname, VIEWS))
app.set('view engine', 'ejs')


/**
 * MIDDLEWARES
 * extending the app and are available when making requests and responses
 */
/*
 middleware serves static files when routing to public access route and accessing website routes
 mapped public dir to /assets
*/
//app.use(express.static('./public'))
app.use(express.static(path.join(__dirname, staticFiles)))

// allows Cors - requests from other services
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// registers session to our app to persists data
app.use(session({
    secret: secret.session,
    resave: false,
    saveUninitialized: true
}))

//todo add bodyparser as a middleware here instead of controllers


/**
 * Fires controllers
 */
toDoController(app)
registerController(app)


// listen to port
app.listen(PORT)
console.log('You are listening to port: ' + PORT)
/**
 * Created by jonlazarini on 05/01/17.
 */
var express = require('express')
var path = require('path')
var morgan = require('morgan')
// persists data
//todo switch to redis for memory cache, etc..
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

// routes
var dashboard = require('./routes/dashboard')

// controllers
var toDoController = require('./controllers/toDoController')
var registerController = require('./controllers/registerController')


/**
 * app config
 * */
var PORT = 3000
var VIEWS = 'views'
var staticFiles = 'public'
var secret = require('./config/tokens/secret')

// creates server
var app = express()
console.log('+++++++++++++++LOCALS+++++++++++++++')
console.log(app.locals)
console.log('++++++++++++++++++++++++++++++++++++')


// set up view engine for server-side rendering using ejs templating
app.set('views', path.join(__dirname, VIEWS))
app.set('view engine', 'ejs')


/**
 * MIDDLEWARES
 * Order matters for import
 * extending the app and are available when making requests and responses
 */
//logger
app.use(morgan('dev'))
// parses every cookies
app.use(cookieParser())
// registers session to our app to persists data
app.use(session({
    secret: secret.session,
    resave: false,
    saveUninitialized: true
}))
/*
 middleware serves static files when routing to public access route and accessing website routes
 mapped public dir to /assets
*/
app.use(express.static(path.join(__dirname, staticFiles)))

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
// tell the app to us the application/json parser
app.use(bodyParser.json())

// // parse application/json example
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

// allows Cors - requests from other services
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * App Routes
 * must be preceded by middleware otherwise bug might occurs
*/
 // route handles bird and about
app.use('/dashboard', dashboard, urlencodedParser)


/**
 * Fires controllers
 */
toDoController(app)
registerController(app)


// listen to port
app.listen(PORT)
console.log('')
console.log('')
console.log('You are listening to port: ' + PORT)
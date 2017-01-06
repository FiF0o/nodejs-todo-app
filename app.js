/**
 * Created by jonlazarini on 05/01/17.
 */
var express = require('express')

var toDoController = require('./controllers/toDoController')

/**
 * app config
 * */
var PORT = 3000


// creates server
var app = express()

// set up view engine for server-side rendering using ejs templating
app.set('view engine', 'ejs')

/* middleware serves static files when routing to public access route and accessing website routes
 mapped public dir to /assets
*/
app.use(express.static('./public'))

// allows Cors - requests from other services
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Fires controllers
 */
toDoController(app)


// listen to port
app.listen(PORT)
console.log('You are listening to port: ' + PORT)
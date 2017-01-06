/**
 * Created by jonlazarini on 05/01/17.
 */
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

/**
 * Connects to the DB
 * with user
 * mongodb://<dbuser>:<dbpassword>@ds135818.mlab.com:35818/nodejs-todo-app
 */
var creds = require('../config/tokens/creds')
mongoose.connect('mongodb://'+ creds.user +':'+ creds.password + '@ds135818.mlab.com:35818/nodejs-todo-app')

/**
 * Creates a Schema - data blueprint
 * MongoDB expects from us
 */
var ToDoSchema = new mongoose.Schema({
    item: String
})

/**
 * Creates a Model to store the collection of items - based on Schema
 * Model Type of ToDo
 */
var ToDoModel = mongoose.model('ToDoModel', ToDoSchema)
// creates item of type ToDo
var todotest = new ToDoModel({item: 'todotest'}).save(function(err) {
    if(err) throw err
    console.log('item saved')
})


// middleware to run in post request to parse the request data from the client-side
var urlencodedParser = bodyParser.urlencoded({extended: false})

// stub for ajax requests, should come from the client side when submitting forms - see item obj in main.js
var data = [
    {item: 'item1'},
    {item: 'item2'},
    {item: 'item3'}
]


/**
 * Controller starts here
 */
// set ups request handlers for our app - expecting requests from client side main.js
module.exports = function(app) {

    // set up routes as toDoController() is called and passed down in app.js
    app.get('/todo', function(req, res) {
        // pass data to the template engine for tDo view to be injected
        res.render('todo', {toDos: data})
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        // adds request body to the data array once parsed to add new items
        console.log('post request: ', req.body)
        data.push(req.body)
        // sends data back to the client as json
        res.json(data)
    })

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            // if truthy remains in the array
            return todo.item.replace(/ /g, '-') !== req.params.item
        })
        res.json(data)
    })

}
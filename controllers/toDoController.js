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
// var testTodo = new ToDoModel({item: 'testTodo'})
//     .save(function(err) {
//         if(err) throw err
//     })


// middleware to run in post request to parse the request data from the client-side
var urlencodedParser = bodyParser.urlencoded({extended: false})

// stub for ajax requests, should come from the client side when submitting forms - see item obj in main.js
// var data = [
//     {item: 'item1'},
//     {item: 'item2'},
//     {item: 'item3'}
// ]


/**
 * Controller starts here
 */
// set ups request handlers for our app - expecting requests from client side main.js
module.exports = function(app) {

    // set up routes as toDoController() is called and passed down in app.js
    app.get('/todo/:username', function(req, res) {
        // get data from mongodb and pass it to the view with he template engine to be injected
        // finds all the items in the collection returned in data
        ToDoModel.find({}, function(err, data) {
            if (err) throw err
            res.render('todo', {username: req.params.username, toDos: data})
        })
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        // adds request body to the data array once parsed to add new items
        console.log('POST request: ', req.body)
        // gets data from the view and add it to mongoDB from request.body
        var newToDo = ToDoModel(req.body)
            .save(function(err, data) {
                if(err) throw err
                console.log(data,' added to the server')
                // sends data back to the DB
                res.json(data)
        })
    })

    app.delete('/todo/:item', function(req, res) {
        // deletes the requested item from DB - replaces hyphens with a space in the routes
        ToDoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err
            // sends data back to the DB
            res.json(data)
        })
    })

}
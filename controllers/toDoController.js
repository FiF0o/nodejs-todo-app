/**
 * Created by jonlazarini on 05/01/17.
 */
// var bodyParser = require('body-parser')
var mongoose = require('mongoose')


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
// var urlencodedParser = bodyParser.urlencoded({extended: false})

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

    app.post('/todo', function(req, res) {
        // adds request body to the data array once parsed to add new items
        console.log('POST request: ', req.body)
        // gets data from the view and add it to mongoDB from request.body
        var newToDo = ToDoModel(req.body)
            .save(function(err, data) {
                if(err) throw err
                console.log(data,'ADDED to the DB')
                // sends data back to the DB
                res.json(data)
        })
    })

    //todo fix routing and make validation for items not be empty strings
    app.delete('/todo/:item', function(req, res) {
        // deletes the requested item from DB - replaces hyphens with a space in the routes
        ToDoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, updatedTodos) {
            if (err) throw err
            // sends data back to the DB
            res.json(updatedTodos)
        })
    })

}
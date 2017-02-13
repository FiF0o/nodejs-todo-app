/**
 * Created by jonlazarini on 10/01/17.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
/**
 * Creates a Schema - data blueprint
 * MongoDB expects from us
 */
var ToDoSchema = new Schema({
    item: String
})

/**
 * Creates a Model to store the collection of items - based on Schema
 * Model Type of ToDo
 */
var ToDoModel = mongoose.model('ToDoModel', ToDoSchema)
var ToDo = new ToDoModel
// ToDoModel stub for ajax requests, should come from the client side when submitting forms - see item obj in main.js
// var data = [
//     {item: 'item1'},
//     {item: 'item2'},
//     {item: 'item3'}
// ]


/**
 * Controller starts here
 */
module.exports = function(router) {

    // set up routes as toDoController() is called and passed down in app.js
    router.get('/:username', function(req, res) {
        // get data from mongodb and pass it to the view with he template engine to be injected
        // finds all the items in the collection returned in data
        var NewToDo = ToDoModel.find({}, function(err, data) {
            if (err) throw err
            res.render('todo', {username: req.params.username, toDos: data})

        })
    })

    // has to post in /todos from client side - see router declared as /todos
    router.post('/', function(req, res) {
        // adds request body to the data array once parsed to add new items
        console.log('POST request: ', req.body)
        // gets data from the view and add it to mongoDB from request.body
        ToDoModel(req.body)
            .save(function(err, data) {
                if(err) throw err
                console.log(data,'ADDED to the DB')
                // sends data back to the DB
                res.json(data)
        })
    })

    //todo fix routing and make validation for items not be empty strings
    router.delete('/:item', function(req, res) {
        // deletes the requested item from DB - replaces hyphens with a space in the routes
        ToDoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, updatedTodos) {
            if (err) throw err
            // sends data back to the DB
            res.json(updatedTodos)
        })
    })


// router.get('/', function(req, res) {
//     res.send('TODOS ROUTE')
// })
//
// router.get('/with', simpleController, function(req, res) {
//     console.log('past the controller')
//     res.send('THIS IS A ROUTE WITH A MW AT THE ROOT, AND A CONTROLLER FIRED AFTER')
// })
//
// router.get('/:username', toDoController, function(req, res, next) {
//
//     console.log('todso loaded')
// })



//     module.exports = function (res, req, next) {
//         console.log('REQ', req.params)
//
//         //     // set up routes as toDoController() is called and passed down in app.js
// //     app.get('/todo/:username', function(req, res) {
// //         // get data from mongodb and pass it to the view with he template engine to be injected
// //         // finds all the items in the collection returned in data
//
//         ToDoModel.find({}, function(err, data) {
//             if (err) throw err
//             res.render('todo', {username: req.params.username, toDos: data})
//
//         })
// //     })
//         console.log('controller fired!')
//         next
//     }



}
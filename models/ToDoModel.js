/**
 * Created by jonlazarini on 18/01/17.
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


module.exports = ToDoModel;
// module.exports = ToDoSchema;
/**
 * Created by jonlazarini on 18/01/17.
 */
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    // firstname: String,
})
var UserModel = mongoose.model('UserModel', UserSchema)
// var testUser = new UserModel({username: 'testUserabcdefghi', password: 'pw'})
//     .save(function(err) {
//         if(err) throw err
//     })

module.exports = UserModel
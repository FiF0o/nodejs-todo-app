/**
 * Created by jonlazarini on 06/01/17.
 */
var express = require('express');
// var router = express.Router()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// var creds = require('../config/tokens/creds')
// mongoose.connect('mongodb://'+ creds.user +':'+ creds.password + '@ds135818.mlab.com:35818/nodejs-todo-app')

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


var urlencodedParser = bodyParser.urlencoded({extended: false})


module.exports = function(app) {

    var USER_SESSION;

    app.post('/register', urlencodedParser, function(req, res) {
        console.log('body ', req.body)
        // gets the details from the route
        var username = req.body.username
        var password = req.body.password
        //todo creates modules for models
        // creates new user and assign the details of the route to the new user
        var newUser = new UserModel()
        newUser.username = username
        newUser.password = password
        newUser.save(function(err, newUser) {
            if(err) {
                console.log(err)
                return res.status(500).send()
            }
            return res.status(200).send()
            console.log('new user saved: ', newUser)
        })
    })

    // set up routes as toDoController() is called and passed down in app.js
    app.get('/register', function(req, res) {
        res.render('register')
    })

    /**
     * Authentication - Choosing POST request as we are creating credentials
    */
    app.post('/login', urlencodedParser, function(req, res) {
        var isUserLogged = req.body.username
        var isCorrectPassword = req.body.password

        // trying to find an existing user username & password in the DB
        UserModel.findOne({username: isUserLogged, password: isCorrectPassword}, function(err, user) {
            if(err) {
                console.log(err)
                return res.status(500).send()
            }
            if(!user) {
                return res.status(404).send()
            }
            // stores user in the session
            req.session.user = user
            // reassigns session to the global
            USER_SESSION = user

            console.log('FOUND: ', user)
            console.log(USER_SESSION.username, ' is logged in')
            return res.status(200).send()
        })
    })

    // app.get('/login', function(req, res) {
    //     res.render('login')
    // })

    app.get('/test', function(req, res) {
        // user is not authenticated, POST /login request failed
        if(USER_SESSION === undefined) {
            return res.status(401).send()
        }
        // returns the page
        return res.status(200).send("connected to the end point!")
    })

}
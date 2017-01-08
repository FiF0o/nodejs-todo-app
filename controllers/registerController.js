/**
 * Created by jonlazarini on 06/01/17.
 */
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


module.exports = function(app) {

    var USER_SESSION;

    app.get('/login', function(req, res) {
        res.render('login')
    })

    app.post('/register', function(req, res) {
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
            console.log('REGISTERED: ', newUser)
            console.log(newUser.username, ' has signed up')
            return res.status(200).send()
        })
    })

    // set up routes as toDoController() is called and passed down in app.js
    app.get('/register', function(req, res) {
        res.render('register')
    })

    /**
     * Authentication - Choosing POST request as we are creating credentials
    */
    app.post('/login', function(req, res) {
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
            // reassigns session to the global to be available
            USER_SESSION = user

            console.log('FOUND: ', user)
            console.log(USER_SESSION.username, ' is logged in')
            return res.status(200).send()
            // return res.redirect('/dashboard')
        })
    })

    // protected page where a session is required
    app.get('/test', function(req, res) {

        // user is not authenticated, POST /login request failed
        if(USER_SESSION === undefined) {
            return res.status(401).send()
        }
        // returns the page
        return res.status(200).send("connected to the end point!")
    })

    app.get('/', function(req, res) {
        // user is not authenticated, POST /login request failed
        if(USER_SESSION === undefined) {
            return res.status(401).send()
        }
        // returns the page
        return res.status(200).send("connected to the end point!")
    })


}
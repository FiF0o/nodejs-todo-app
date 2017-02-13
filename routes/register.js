/**
 * Created by jonlazarini on 18/01/17.
 */
var mongoose = require('mongoose')
var UserModel = require('../models/UserModel')

var newUser = new UserModel()


module.exports = function(router) {


    router.post('/', function(req, res) {
        console.log('body ', req.body)
        // gets the details from the body req headers with username and password fields
        var username = req.body.username
        var password = req.body.password
        //todo creates modules for models
        // creates new user in the DB and assign the details from the body req headers to it
        newUser.username = username
        newUser.password = password
        //saves user in the DB
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

    // set up routes as toDoController() is called and passed down in router.js
    router.get('/', function(req, res) {
        res.render('register')
    })


}
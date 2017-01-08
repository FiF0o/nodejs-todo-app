/**
 * Created by jonlazarini on 07/01/17.
 */
var express = require('express')
var router = express.Router()

var data = {toto: 'tata'}
var COOKIE_USER = 'jonlazarini'


/**
 * Router code starts here
 */
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// define the home page route
router.get('/', function (req, res) {
    console.log('COOKIES: ', req.cookies)
    console.log('SESSION: ', req.session)
    res.render('dashboard', {data: data, toto: data.toto, cookie_user: COOKIE_USER})
})

// test for post request with router
router.post('/', function(req, res) {
    console.log('/ BODY', req.body)
})


module.exports = router

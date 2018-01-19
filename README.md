This a simple Todo List app using nodejs, ejs templating engine and mongoDB.

`node app` to start the app.

# Prerequisites
Must have mongoDB installed or alternatively you can use [mlab].
Add a `creds.js` module in config/tokens dir having key value pairs of `user` and `password`.

## App
opens on port `3005`.

## Routes
* POST: `/login`
* GET, POST: `/register`
* GET: `/todo/<username>`
* POST: `/todo`
* DELETE: `/todo/<todoId>`


### Todo
- test
- error handling
- cookies
- sessions
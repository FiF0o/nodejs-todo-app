/**
 * Created by jonlazarini on 05/01/17.
 */
$(document).ready(function(){

    var USER = window.USER = 'UNKNOWN'

    $('#todo_form').on('submit', function(){

        var item = $('input#new_todo')
        var todo = {item: item.val()}

        $.ajax({
            type: 'POST',
            url: '/todo',
            // Cors support
            // crossDomain: true,
            data: todo,
            success: function(data){
                console.log(data)
                location.reload()
            }
        })

        return false;

    })

    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                console.log(data)
                // reloads the page once the item is added...
                //todo do something with the data via front-end framework
                location.reload()
            }
        })
    })

    $('#register_form').on('submit', function() {
        // creates a username to send to the server
        var username = $('input[name="username"]').val()
        var password = $('input[name="password"]')

        USER = username

        var user = {
            username: USER,
            password: password.val()
        }
        $.ajax({
            type: 'POST',
            url: '/register',
            data: user,
            success: function(data) {
                console.log(data)

                location.reload()
            }
        })
    })

    $('#login_form').on('submit', function() {

        var username = $('input[name="username"]').val()
        var password = $('input[name="password"]')

        USER = username

        var user = {
            username: USER,
            password: password.val()
        }
        $.ajax({
            // triggers a post request to query the DB for authentication
            type: 'POST',
            url: '/login',
            data: user,
            success: function(data) {
                console.log(data)

                //todo fix...
                location.href = "https://www.google.com"
            }
        })
    })

    $('#toto').on('submit', function() {
        // creates a username to send to the server
        var toto = $('input[name="toto"]').val()

        var data = {
            toto: toto.val()
        }
        $.ajax({
            type: 'POST',
            url: '/dashboard',
            data: data,
            success: function(data) {
                location.reload()
            }
        })
    })


})
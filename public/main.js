/**
 * Created by jonlazarini on 05/01/17.
 */
$(document).ready(function(){

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

})
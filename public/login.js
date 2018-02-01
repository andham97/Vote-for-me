$(function(){
    $("#login").click(function(){
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function(){
                window.location = '/admin';
            },
            error: console.error
        });
    });
});
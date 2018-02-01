$(function(){
    $("#join").click(function(){
        console.log("join");
        $.ajax({
            url: '/api/join',
            method: 'POST',
            data: {
                pin: Number($("#pin").val())
            },
            success: function(){
                window.location = '/voting';
            },
            error: console.error
        });
    });
});
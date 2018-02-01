var socket = io();

$(function(){
    $.ajax({
        url: '/api/votings',
        method: 'GET',
        success: render,
        error: console.error
    });
});

function render(data){
    var h = "<ul class='list-group'>";
    for(var i = 0; i < data.length; i++){
        h += "<li class='list-group-item'>" + data[i].pin + '</li>';
    }
    h += "</ul>";
    $("body").html(h);
    setupClicks();
}

function setupClicks(){
    $('.menu').click(function(){
        var id = $(this).data('id');
        $('#' + id).show();
    });
}
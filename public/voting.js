var socket = io();

socket.on('cause', function(data){
    var h = '<h1>' + data.title + '</h1>';
    for(var i = 0; i < data.alt.length; i++){
        h += "<input type='radio' name='alt' data-id='" + i + "'> " + data.alt[i] + "<br>";
    }
    h += "<button id='cast'>Cast vote</button>";
    $('body').html(h);
    $('#cast').click(function(){
        socket.emit('cast', $('input[type=radio]:checked').data('id'));
    });
});

$(function(){
    $('body').html('Searching/waiting...');
});
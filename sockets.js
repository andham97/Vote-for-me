module.exports = function(server, session){
    var io = require('socket.io')(server);
    var sockets = [];
    var Voting = require('./data/Voting');

    io.use(require('express-socket.io-session')(session));

    io.on('connection', function (socket) {
        sockets.push({
            socket: socket,
            vote: -1
        });

        socket.on('disconnect', function(){
            for(var i = 0; i < sockets.length; i++){
                if(sockets[i].socket.id === socket.id){
                    sockets.splice(i, 1);
                    break;
                }
            }
        });

        socket.on('cast', function(data){
            if(!isVoter(socket) || isNaN(data))
                return;
            for(var i = 0; i < sockets.length; i++){
                if(sockets[i].socket.id === socket.id){
                    sockets[i].vote = data;
                    break;
                }
            }
        });

        socket.on('add cause', function(data){
            if(!isAdmin(socket) || !data.title || !data.alt || !data.pin)
                return;
            console.log(data);
            Voting.find({author: socket.handshake.session.user}, function(err, result){
                var vote;
                for(var i = 0; i < result.length; i++){
                    if(result[i].pin == data.pin){
                        vote = result[i];
                        break;
                    }
                }
                console.log(vote);
                if(!vote)
                    return;
                vote.causes.push({
                    title: data.title,
                    alt: data.alt
                });
                vote.save();
                console.log(vote);
            });
        });

        socket.on('create voting', function(data){

        })
    });
};

function isAdmin(socket){
    return socket.handshake.session.user !== undefined;
}

function isVoter(socket){
    return socket.handshake.session.pin !== undefined;
}
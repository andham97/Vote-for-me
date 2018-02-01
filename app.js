var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI);
dbCon = mongoose.connection;
dbCon.on('error', console.error.bind(console, 'Connection error: '));
dbCon.on('open', function() {

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    var app = express();
    var server = require('http').Server(app);
    var cookieParser = require('cookie-parser');
    var session = require('express-session')({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    });

    app.use(logger('common'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(session);
    require('./sockets')(server, session);

    app.use('/', require('./routes'));

    server.listen(process.env.HTTP_PORT);
    console.log("Server is listening on port 8000");
});
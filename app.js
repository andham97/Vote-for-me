var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI);
dbCon = mongoose.connection;
dbCon.on('error', console.error.bind(console, 'Connection error: '));
dbCon.on('open', function() {
    var fs = require('fs');
    var express = require('express');
    var app = express();
    var opts = {
        cert: fs.readFileSync(process.env.HTTPS_PUB_CERT),
        key: fs.readFileSync(process.env.HTTPS_PRIV_CERT)
    };
    var serverHttps = require('https').createServer(opts, app);
    var path = require('path');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
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
    app.use('*', require('express-https-redirect')(true));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(session);
    require('./sockets')(serverHttps, session);

    app.use('/', require('./routes'));

    serverHttps.listen(process.env.HTTPS_PORT);
    console.log("Server is listening on port " + process.env.HTTPS_PORT + "...");
});
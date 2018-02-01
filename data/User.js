var mongoose = require('mongoose');

module.exports = dbCon.model('Users', new mongoose.Schema({
    username: String,
    password: String
}, {collection: 'Users'}));
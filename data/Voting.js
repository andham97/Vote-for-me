var mongoose = require('mongoose');

module.exports = dbCon.model('Votings', new mongoose.Schema({
    pin: String,
    active: Boolean,
    causes: Array,
    author: mongoose.Schema.Types.ObjectId
}, {collection: 'Votings'}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flights');

module.exports = mongoose.connection;
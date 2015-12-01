var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flightSchema = new Schema({
   number: Number,
   origin: String,
   destination: String,
   arrives: String,
   departs: String,
   actualArrive: Number,
   actualDepart: Number
});

module.exports = mongoose.model('Flight', flightSchema);
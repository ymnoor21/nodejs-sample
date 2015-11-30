var mongoose = require('mongoose');

module.exports = mongoose.model('Flight', {
	number: Number,
	origin: String,
	destination: String,
	arrives: String,
	departs: String,
	actualArrive: Number,
	actualDepart: Number
});
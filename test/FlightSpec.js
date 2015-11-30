var app = require('./helpers/app');

var mocha = require('mocha'),
	supertest = require('supertest'),
	should = require('should');

describe('flights', function() {
	it ('should return valid data for flight 237', function(done) {
		supertest(app)
		.get('/flights/237')
		.expect(200)
		.end(function (err, res) {
			res.status.should.be.exactly(200).and.be.a.Number();
			done();
		});
	});
});
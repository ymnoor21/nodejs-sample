var app = require('./helpers/app');

var mocha = require('mocha'),
    supertest = require('supertest'),
    should = require('should');

describe('flights', function() {
    it ('should return valid data for flight 237', function (done) {
        supertest(app)
        .get('/flights/237')
        .expect(200)
        .end(function (err, res) {
            should(res.status).be.exactly(200).and.be.a.Number();
            done();
        });
    });

    it ('should return an error for invalid flight number', function (done) {
        supertest(app)
        .get('/flights/400')
        .expect(404)
        .end(function (err, res) {
            should(res.status).be.exactly(404).and.be.a.Number();
            done();
        })
    });

    it ('should check if a flight has arrived', function (done) {
        supertest(app)
        .put('/flights/237/arrived')
        .expect(200)
        .end(function (err, res) {
            should(res.status).be.exactly(200).and.be.a.Number();
            should(res.body.status).equal('done');

            supertest(app)
            .get('/flights/237')
            .expect(200)
            .end(function (err, res) {
                should(res.status).be.exactly(200).and.be.a.Number();
                should(res.body.actualArrive).not.equal(undefined);
                done();
            });
        });
    });
});
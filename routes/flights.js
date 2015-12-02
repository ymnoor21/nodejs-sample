module.exports = function(flights) {
    var express = require('express');
    var router = express.Router();

    var flight = require('../flight');
    var FlightModel = require('../schemas/flight');

    for (var number in flights) {
        flights[number] = flight.create(flights[number])
    }

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('Flight Index', { title: 'Express' });
    });

    router.get('/arrival', function(req, res, next) {
        FlightModel.find()
        .sort({'actualArrive': 1})
        .exec(function (err, arrivals) {
            if (err) {
                res.status(500).json({'status': 'failure'});
            } else {
                res.render('arrivals', {
                    title: 'Arrivals',
                    arrivals: arrivals,
                    lastNumber: req.session.lastNumber
                });
            }
        });
    });

    router.get('/list', function(req, res, next) {
        res.render('list', { title: 'Flights List', flights: flights});
    });

    router.get('/list/json', function(req, res, next) {
        var flightData = [];

        for (var number in flights) {
            flightData.push(flights[number].getInformation());
        }

        res.json(flightData);
    });

    router.get('/:number', function(req, res, next) {
        var number = req.params['number'];

        req.session.lastNumber = number;
      
        if (typeof flights[number] === 'undefined') {
            res.status(404).json({'status': 'error'});
        } else {
            res.json(flights[number].getInformation());
        }
    });

    router.put('/:number/arrived', function(req, res, next) {
        var number = req.params['number'];
      
        if (typeof flights[number] === 'undefined') {
            res.status(404).json({'status': 'error'});
        } else {
            flights[number].triggerArrive();

            var record = new FlightModel(flights[number].getInformation());

            record.save(function (err) {
                if (err) {
                    res.status(500).json({'status': 'failure'});
                } else {
                    res.status(200).json({'status': 'success', 'info': flights[number].getInformation()});
                }
            });
        }
    });

    return router;
};
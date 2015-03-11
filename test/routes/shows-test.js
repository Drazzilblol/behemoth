'use strict';

var expect = require('chai').expect;
//var async = require('async');
var requireHelper = require('../helpers/require_helper');
var app = require('./supertest-app').app;
var agent = require('./supertest-app').agent;
var Show = requireHelper.requireCoverage(__dirname, '../../server/models/tvShow').Show;
var mongoose = require('mongoose');
var util = require('../helpers/util');
var fixtures = require('./fixtures');
var request = require('superagent');
var user1 = request.agent();

describe('show routes', function () {

  before(function (done) {
    var prepare = function () {
      util.cleanDatabase(function () {
        var stubShows = require('./fixtures/testRecords.json');
        Show.collection.insert(stubShows, done);
      });
    };
    if (mongoose.connection.readyState === mongoose.STATES.connecting) {
      mongoose.connection.on('connected', function () {
        prepare();
      });
    } else {
      prepare();
    }
  });

  after(function (done) {
    util.cleanDatabase(done);

  });

    it('should return data from with default sort and 200 status', function (done) {

      user1
        .post('http://localhost:3000/api/users/login')
        .send({ username: 'admin', password: 'admin' })
        .end(function(err, res) {
          console.log(res.headers);
          user1.get('http://localhost:3000/api/shows')
           //  .expect('Content-Type', 'application/json; charset=utf-8')
            // .expect(200)
            // .expect(function (res) {
            // expect(res.body).to.deep.eq(fixtures.from1To5NoSort);
            //   })
            .end(function(err, res){
              console.log(res.header);
            //  expect(res.body).to.deep.eq(fixtures.from1To5NoSort);
              done();
            });
          // user1 will manage its own cookies
          // res.redirects contains an Array of redirects
        });


    });

/*
    it('should return data from 1 to 5 with sort by year, without dir and 200 status',
      function (done) {
        app.post('/service/data')
          .send({start: 0, length: 5, order: [{column: '2'}]})
          .expect('Content-Type', 'application/json')
          .expect(200)
          .expect(function (res) {
            expect(res.body.recordsFiltered).to.eq(50);
            expect(res.body.recordsTotal).to.eq(50);
            expect(res.body.data).to.deep.eq(fixtures.from1To5SortByYearDesc);
          })
          .end(done);
      });

    it('should return data from 1 to 5 with sort by year desc and 200 status', function (done) {
      app.post('/service/data')
        .send({start: 0, length: 5, order: [{column: '2', dir: 'desc'}]})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body.recordsFiltered).to.eq(50);
          expect(res.body.recordsTotal).to.eq(50);
          expect(res.body.data).to.deep.eq(fixtures.from1To5SortByYearDesc);
        })
        .end(done);
    });

    it('should return data from 1 to 5 with sort by year asc and 200 status', function (done) {
      app.post('/service/data')
        .send({start: 0, length: 5, order: [{column: '2', dir: 'asc'}]})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body.recordsFiltered).to.eq(50);
          expect(res.body.recordsTotal).to.eq(50);
          expect(res.body.data).to.deep.eq(fixtures.from1To5SortByYearAsc);
        })
        .end(done);
    });

    it('should return data from 1 to 5 with sort by rating, without dir and 200 status',
      function (done) {
        app.post('/service/data')
          .send({start: 0, length: 5, order: [{column: '3'}]})
          .expect('Content-Type', 'application/json')
          .expect(200)
          .expect(function (res) {
            expect(res.body.recordsFiltered).to.eq(50);
            expect(res.body.recordsTotal).to.eq(50);
            expect(res.body.data).to.deep.eq(fixtures.from1To5SortByRatingDesc);
          })
          .end(done);
      });

    it('should return data from 1 to 5 with sort by rating desc and 200 status', function (done) {
      app.post('/service/data')
        .send({start: 0, length: 5, order: [{column: '3', dir: 'desc'}]})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body.recordsFiltered).to.eq(50);
          expect(res.body.recordsTotal).to.eq(50);
          expect(res.body.data).to.deep.eq(fixtures.from1To5SortByRatingDesc);
        })
        .end(done);
    });

    it('should return data from 1 to 5 with sort by rating asc and 200 status', function (done) {
      app.post('/service/data')
        .send({start: 0, length: 5, order: [{column: '3', dir: 'asc'}]})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body.recordsFiltered).to.eq(50);
          expect(res.body.recordsTotal).to.eq(50);
          expect(res.body.data).to.deep.eq(fixtures.from1To5SortByRatingAsc);
        })
        .end(done);
    });

    it('should return data from 1 to 5 with sort by votes, without dir and 200 status',
      function (done) {
        app.post('/service/data')
          .send({start: 0, length: 5, order: [{column: '4'}]})
          .expect('Content-Type', 'application/json')
          .expect(200)
          .expect(function (res) {
            expect(res.body.recordsFiltered).to.eq(50);
            expect(res.body.recordsTotal).to.eq(50);
            expect(res.body.data).to.deep.eq(fixtures.from1To5SortByVotesDesc);
          })
          .end(done);
      });

    it('should return data from 1 to 5 with sort by votes desc and 200 status', function (done) {
      app.post('/service/data')
        .send({start: 0, length: 5, order: [{column: '4', dir: 'desc'}]})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body.recordsFiltered).to.eq(50);
          expect(res.body.recordsTotal).to.eq(50);
          expect(res.body.data).to.deep.eq(fixtures.from1To5SortByVotesDesc);
        })
        .end(done);
    });

    it('should return data from 1 to 5 with sort by votes asc and 200 status', function (done) {
      app.post('/service/data')
        .send({start: 0, length: 5, order: [{column: '4', dir: 'asc'}]})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body.recordsFiltered).to.eq(50);
          expect(res.body.recordsTotal).to.eq(50);
          expect(res.body.data).to.deep.eq(fixtures.from1To5SortByVotesAsc);
        })
        .end(done);
    });
  });
  */
});

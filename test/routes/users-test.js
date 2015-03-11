'use strict';

var expect = require('chai').expect;
//var async = require('async');
var requireHelper = require('../helpers/require_helper');
var app = require('./supertest-app').app;
var User = requireHelper.requireCoverage(__dirname, '../../server/models/user').User;
var mongoose = require('mongoose');
var util = require('../helpers/util');
var fixtures = require('./fixtures');

describe('user routes', function () {

  before(function (done) {
    var prepare = function () {
      util.cleanDatabase(function () {
        var stubUsers = require('./fixtures/testUsers.json')
        User.collection.insert(stubUsers, done);
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
    it('should return user data and 200 status', function (done) {
      app.post('/api/users/login')
        .send({username: "admin", password: "admin"})
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.deep.eq({name: "admin"});
        })
        .end(done);
    });
});
'use strict';

var expect = require('chai').expect;
var requireHelper = require('./helpers/require_helper');
var config = requireHelper.requireCoverage(__dirname, '../config/config');

describe('config module', function () {
  describe('test config properties', function () {
    it('shoul have all properties not empty', function (done) {
      expect(config).to.have.property('title');
      expect(config).to.have.property('defaultPort');
      expect(config).to.have.property('mongoose');
      expect(config.mongoose).to.have.property('uri');
      expect(config.mongoose).to.have.property('options');
      done();
    });
  });
});
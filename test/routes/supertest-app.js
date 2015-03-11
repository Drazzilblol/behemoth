'use strict';

var request = require('supertest');
var requireHelper = require('../helpers/require_helper');

module.exports.app = request(requireHelper.requireCoverage(__dirname, '../../app'));
module.exports.agent = request.agent('http://localhost:3000');
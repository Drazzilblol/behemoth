'use strict';

/* Services */

var showListServices = angular.module('showListServices', ['ngResource']);

showListServices.factory('Show', ['$resource',
  function($resource) {
    return $resource('api/shows/:showId', {}, {
      query: {method: 'GET', params: {showId: ''}, isArray: true}
    });
  }]);

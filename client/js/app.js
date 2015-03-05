'use strict';

/* App Module */

var showListApp = angular.module('showListApp', [
  'ngRoute',
  'phonecatAnimations',

  'showListControllers',
  'showListFilters',
  'showListServices'
]);

showListApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/shows', {
        templateUrl: 'partials/show-list.html',
        controller: 'ShowListCtrl'
      }).
      when('/shows/:showId', {
        templateUrl: 'partials/show-detail.html',
        controller: 'ShowDetailCtrl'
      }).
      otherwise({
        redirectTo: '/shows'
      });
  }]);

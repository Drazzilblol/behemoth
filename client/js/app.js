'use strict';

/* App Module */

var showListApp = angular.module('showListApp', [
  'ngRoute',
  'phonecatAnimations',
  'ngResource',
  'showListControllers',
  'showListFilters',
  'showListServices'
]);

showListApp.config(['$routeProvider','$httpProvider',

  function($routeProvider, $httpProvider) {

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
// Initialize a new promise
      var deferred = $q.defer();
// Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
// Authenticated
        if (user !== '0')
        /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();
// Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
//$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });
      return deferred.promise;
    };

    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
// do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });

    $routeProvider.
      when('/shows', {
        templateUrl: 'partials/show-list.html',
        controller: 'ShowListCtrl'
      })
      .when('/shows/:showId', {
        templateUrl: 'partials/show-detail.html',
        controller: 'ShowDetailCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/shows'
      })

  }]).run(function($rootScope, $http){
  $rootScope.message = '';
// Logout function is available in any pages
  $rootScope.logout = function(){
    $rootScope.message = 'Logged out.';
    $http.post('/logout');
  };});

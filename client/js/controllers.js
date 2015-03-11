'use strict';

/* Controllers */

var showListControllers = angular.module('showListControllers', []);

showListControllers.controller('ShowListCtrl', ['$scope', 'Show',
  function($scope, Show) {

    $scope.shows = Show.query();

  }]);

showListControllers.controller('ShowDetailCtrl', ['$scope', '$routeParams', 'Show',
  function($scope, $routeParams, Show) {

    $scope.show = Show.get({showId: $routeParams.showId}, function(show) {
      $scope.mainImageUrl = show.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

showListControllers.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
// This object will be filled by the form
  $scope.user = {};
// Register the login() function
  $scope.login = function(){
    $http.post('/api/users/login', {
      username: $scope.user.username,
      password: $scope.user.password
    })
      .success(function(user){
// No error: authentication OK
        $rootScope.message = 'Authentication successful!';
        $location.url('/admin');
      })
      .error(function(){
// Error: authentication failed
        $rootScope.message = 'Authentication failed.';
        $location.url('/login');
      });
  };
});
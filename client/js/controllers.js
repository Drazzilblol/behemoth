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

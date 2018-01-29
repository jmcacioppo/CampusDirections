'use strict';
angular.module('campusDirections', ['chat'])
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'Messages'];

function HomeController($scope, Messages) {
    $scope.name = "Joseph";
}
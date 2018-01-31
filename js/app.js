'use strict';

var campusDirections = angular.module('campusDirections', ['chat', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .otherwise({redirectTo: '/'});
        
        // Use the HTML5 History API
        //$locationProvider.html5Mode(true);
    });
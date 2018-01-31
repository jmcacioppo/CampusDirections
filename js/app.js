'use strict';

var campusDirections = angular.module('campusDirections', ['chat', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/messages', {
                templateUrl: 'views/messages.html',
                controller: 'MessagesController'
            })
            .otherwise({redirectTo: '/'});
        
        // Use the HTML5 History API
        $locationProvider.html5Mode(true);
    });
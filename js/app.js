'use strict';

var campusDirections = angular.module('campusDirections', ['chat', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .otherwise({redirectTo: '/'});
        // $urlRouterProvider.otherwise('/home');

        // $stateProvider
        //     .state('app', {
        //         abstract: true,
        //         template: '<ui-view></ui-view>'
        //     })
        //     .state('app.main', {
        //         url: '/home',
        //         templateUrl: 'views/home.html',
        //         controller: 'HomeController'
        //     })
        
        // Use the HTML5 History API
        //$locationProvider.html5Mode(true);
    });
// 'use strict';
// angular.module('campusDirections', ['chat'])
//     .controller('HomeController', HomeController);

// HomeController.$inject = ['$scope', 'Messages'];

// function HomeController($scope, Messages) {
//     $scope.name = "Joseph";
// }

// var chat = angular.module( 'campusDirections', ['chat'] );
// chat.controller( 'HomeController', [ 'Messages', '$scope', function( Messages, $scope ) {
//     // Message Inbox 
//     $scope.messages = [];
//     // Receive Messages 
//     Messages.receive(function(message){
//         $scope.messages.push(message);
//     });
//     // Send Messages 
//     $scope.send = function() {
//         Messages.send({ data : $scope.textbox });
//     };
// } ] );


campusDirections.controller('HomeController', ['$scope', 'Messages',
    function($scope, Messages) {
        $scope.name = "Joseph";

        // Message Inbox 
        $scope.messages = [];

        // Receive Messages 
        Messages.receive(function(message){
            $scope.messages.push(message);
        });

        // Send Messages 
        $scope.send = function() {
            Messages.send({ data : $scope.textbox });
        };
    }
]);
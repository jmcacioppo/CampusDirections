campusDirections.controller('MessagesController', ['$scope', 'Messages',
    function($scope, Messages) {
        // Message Inbox 
        $scope.messages = [];

        // User 
        Messages.user({ id: 12345, name : 'Joseph' });

        // Receive Messages 
        Messages.receive(function(message){
            $scope.messages.push(message);
            //message.remove();
        });

        // Send Messages 
        $scope.send = function() {
            Messages.send({ data : $scope.textbox });
            $scope.textbox = '';
        };
    }
]);
campusDirections.controller('MessagesController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location',
    function($scope, Messages, TransferData, Notification, $location) {
        $scope.user = TransferData.getUser();

        // Message Inbox 
        $scope.messages = [];

        // User 
        Messages.user({ 
            id: $scope.user.name, 
            name : $scope.user.name 
        });

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
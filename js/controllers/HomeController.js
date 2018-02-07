campusDirections.controller('HomeController', ['$scope', 'TransferData', 'Notification', '$location',
    function($scope, TransferData, Notification, $location) {
        $scope.availableLanguages = [
            'Arabic', 'Bosnian', 'Cantonese', 'Chinese Traditional', 'Croation',
            'Czech', 'Dutch', 'English', 'Filipino', 'French', 'German', 'Greek',
            'Hindi', 'Italian', 'Japanese', 'Korean', 'Polish','Portuguese', 'Russian', 
            'Spanish', 'Swedish', 'Thai', 'Turkish', 'Vietnamese'
        ];

        $scope.receiveDirectionsLanguage = 'English';
        $scope.giveDirectionsLanguage = 'Spanish';

        $scope.next = function() {
            var user = {
                receivingName: $scope.receivingName,
                givingName: $scope.givingName,
                receiveLanguage: $scope.receiveDirectionsLanguage,
                giveLanguage: $scope.giveDirectionsLanguage
            }
            
            TransferData.setUser(user);
            $location.path('/messages');
        }
    }
]);
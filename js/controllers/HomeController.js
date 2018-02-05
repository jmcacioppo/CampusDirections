campusDirections.controller('HomeController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location',
    function($scope, Messages, TransferData, Notification, $location) {
        $scope.availableLanguages = ['Arabic', 'English', 'French', 'Italian', 'Portuguese', 'Spanish'];

        $scope.receiveDirectionsLanguage = 'English';
        $scope.giveDirectionsLanguage = 'Spanish';

        $scope.next = function() {
            var user = {
                receiveLanguage: $scope.receiveDirectionsLanguage,
                giveLanguage: $scope.giveDirectionsLanguage
            }
            
            TransferData.setUser(user);
            $location.path('/messages');
        }
    }
]);
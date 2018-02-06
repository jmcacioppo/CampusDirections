campusDirections.controller('HomeController', ['$scope', 'TransferData', 'Notification', '$location',
    function($scope, TransferData, Notification, $location) {
        $scope.availableLanguages = ['Arabic', 'English', 'French', 'Italian', 'Portuguese', 'Spanish'];

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
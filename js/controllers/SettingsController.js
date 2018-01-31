campusDirections.controller('SettingsController', ['$scope', 'TransferData', 'Notification', '$location',
    function($scope, TransferData, Notification, $location) {
        $scope.user = TransferData.getUser();

        $scope.back = function() {
            $location.path('/messages');
        }

        $scope.saveChanges = function() {
            TransferData.setUser($scope.user);
            Notification.success({ message: 'Successful!' });        
        }
    }
]);
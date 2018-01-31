campusDirections.controller('SettingsController', ['$scope', 'TransferData', 'Notification',
    function($scope, TransferData, Notification) {
        $scope.user = TransferData.getUser();

        $scope.saveChanges = function() {
            TransferData.setUser($scope.user);
            Notification.success({ message: 'Successful!' });        
        }
    }
]);
campusDirections.controller('SettingsController', ['$scope',
    function($scope) {
        $scope.name = "Joseph";

        $scope.saveChanges = function() {
            console.log($scope.name);
        }
    }
]);
campusDirections.controller('HomeController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location',
    function($scope, Messages, TransferData, Notification, $location) {
        $scope.user = {
            action: 'receive',
            language: 'English',
            name: '',
            language: ''
        };

        $scope.receiveClass = 'selectedButton';
        $scope.giveClass = 'unselectedButton';

        $scope.selectAction = function(action) {
            if(action === 'receive') $scope.user.action = 'receive';
            else if(action === 'give') $scope.user.action = 'give';
            checkClass();
        }

        $scope.next = function() {
            TransferData.setUser($scope.user);
            $location.path('/messages');
        }

        function checkClass() {
            if($scope.user.action === 'receive') {
                $scope.receiveClass = 'selectedButton';
                $scope.giveClass = 'unselectedButton';
            }
            else if($scope.user.action === 'give') {
                $scope.receiveClass = 'unselectedButton';
                $scope.giveClass = 'selectedButton';
            }        
        }
    }
]);
campusDirections.controller('HomeController', ['$scope', 'Messages',
    function($scope, Messages) {
        $scope.action = 'receive';
        $scope.receiveClass = 'selectedButton';
        $scope.giveClass = 'unselectedButton';

        $scope.selectLanguage = function() {
            console.log($scope.language);
        }

        $scope.selectAction = function(action) {
            if(action === 'receive') $scope.action = 'receive';
            else if(action === 'give') $scope.action = 'give';

            checkClass();
        }

        function checkClass() {
            if($scope.action === 'receive') {
                $scope.receiveClass = 'selectedButton';
                $scope.giveClass = 'unselectedButton';
            }
            else if($scope.action === 'give') {
                $scope.receiveClass = 'unselectedButton';
                $scope.giveClass = 'selectedButton';
            }        
        }
    }
]);
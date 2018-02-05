campusDirections.controller('MessagesController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location', '$http', 'TRANSLATOR_SUBSCRIPTION',
    function($scope, Messages, TransferData, Notification, $location, $http, TRANSLATOR_SUBSCRIPTION) {        
        $scope.user = TransferData.getUser();
        setLanguages();

        function setLanguages() {
            $scope.receiveCode = setLanguageCode($scope.user.receiveLanguage);
            $scope.giveCode = setLanguageCode($scope.user.giveLanguage);
        }

        function setLanguageCode(language) {
            var code = '';
            
            switch(language) {
                case 'Arabic': 
                    code = 'ar'; 
                    break;
                case 'English': 
                    code = 'en'; 
                    break;
                case 'French': 
                    code = 'fr'; 
                    break;
                case 'Italian': 
                    code = 'it'; 
                    break;
                case 'Portuguese': 
                    code = 'pt'; 
                    break;
                case 'Spanish': 
                    code = 'es'; 
                    break;
            }

            return code;
        }

        $scope.TranslateText = function() {
            setURLForAPI();

            var dataForPOST = {
                key : TRANSLATOR_SUBSCRIPTION.key,
                host: $scope.host,
                path: $scope.path
            }
            
            translateAPICall(dataForPOST);
        }

        function setURLForAPI() {
            let target = $scope.receiveCode;
            //let target = 'fr-fr';
            let text = $scope.textToTranslate;
            let params = '?to=' + target + '&text=' + encodeURI(text);
            
            $scope.host = 'api.microsofttranslator.com';
            $scope.path = '/V2/Http.svc/Translate' + params;
        }
        
        function translateAPICall(dataForPOST) {
            $http.post('http://localhost:3000/api/translate', dataForPOST)
                .then( (response) => {
                    console.log(response);
                })
                .catch( (err) => {
                    console.log(err);
                });
        }

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
campusDirections.controller('MessagesController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location', '$http', 'TRANSLATOR_SUBSCRIPTION',
    function($scope, Messages, TransferData, Notification, $location, $http, TRANSLATOR_SUBSCRIPTION) {        
        // Message Inbox 
        $scope.receivingMessages = [];
        $scope.givingMessages = [];
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

        $scope.translateText = function(textToTranslate) {
            var languageCode = '';
            
            if($scope.receivingMessages.length % 2 == 1) {
                languageCode = $scope.receiveCode;
                $scope.userName = $scope.user.givingName;
            }
            else {
                languageCode = $scope.giveCode;
                $scope.userName = $scope.user.receivingName;
            }
            
            setURLForAPI(languageCode, textToTranslate);

            var dataForPOST = {
                key : TRANSLATOR_SUBSCRIPTION.key,
                host: $scope.host,
                path: $scope.path
            }
            
            translateAPICall(dataForPOST, textToTranslate);
        }

        function setURLForAPI(languageCode, textToTranslate) {
            let target = languageCode;
            let text = textToTranslate;
            let params = '?to=' + target + '&text=' + encodeURI(text);
            
            $scope.host = 'api.microsofttranslator.com';
            $scope.path = '/V2/Http.svc/Translate' + params;
        }
        
        function translateAPICall(dataForPOST, textToTranslate) {
            $http.post('http://localhost:3000/api/translate', dataForPOST)
                .then( (response) => {
                    $scope.receivingMessages.push({
                        'userName': $scope.userName,
                        'originalText': textToTranslate,
                        'translatedText': response.data
                    });
                })
                .catch( (err) => {
                    console.log(err);
                });
        }
    }
]);
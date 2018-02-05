campusDirections.controller('MessagesController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location', '$http', 'TRANSLATOR_SUBSCRIPTION',
    function($scope, Messages, TransferData, Notification, $location, $http, TRANSLATOR_SUBSCRIPTION) {
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

        function translateText(textToTranslate, receiverOrGiver) {
            var languageCode = '';
            
            if(receiverOrGiver == 'receiver') languageCode = $scope.giveCode;
            else if(receiverOrGiver == 'giver') languageCode = $scope.receiveCode;
            
            setURLForAPI(languageCode, textToTranslate);

            var dataForPOST = {
                key : TRANSLATOR_SUBSCRIPTION.key,
                host: $scope.host,
                path: $scope.path
            }
            
            translateAPICall(dataForPOST, textToTranslate, receiverOrGiver);
        }

        function setURLForAPI(languageCode, textToTranslate) {
            let target = languageCode;
            let text = textToTranslate;
            let params = '?to=' + target + '&text=' + encodeURI(text);
            
            $scope.host = 'api.microsofttranslator.com';
            $scope.path = '/V2/Http.svc/Translate' + params;
        }
        
        function translateAPICall(dataForPOST, textToTranslate, receiverOrGiver) {
            $http.post('http://localhost:3000/api/translate', dataForPOST)
                .then( (response) => {
                    if(receiverOrGiver == 'receiver') {
                        $scope.stepsTranslated.push(response.data);
                    }
                    else {
                        $scope.givingMessages.push({
                            'originalText': textToTranslate,
                            'translatedText': response.data
                        });

                        $scope.giverTextToTranslate = '';
                    }
                })
                .catch( (err) => {
                    console.log(err);
                });
        }

        $scope.directionsRequested = false;
        $scope.ifStepsTranslated = false;
        $scope.directionsRequest = function() {
            $scope.directionsRequested = true;
        }

        $scope.stepsForDirections = ['', '', '', '', ''];
        $scope.translateSteps = function() {
            $scope.ifStepsTranslated = true;
            $scope.stepsForDirections.forEach( (step, i) => {
                translateText(step, 'receiver');
                console.log($scope.stepsTranslated);
            });
        }

        $scope.stepsTranslated = [];

    }
]);
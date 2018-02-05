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

        async function translateText(textToTranslate, receiverOrGiver) {
            var languageCode = '';
            
            if(receiverOrGiver == 'receiver') languageCode = $scope.giveCode;
            else if(receiverOrGiver == 'giver') languageCode = $scope.receiveCode;
            
            setURLForAPI(languageCode, textToTranslate);

            var dataForPOST = {
                key : TRANSLATOR_SUBSCRIPTION.key,
                host: $scope.host,
                path: $scope.path
            }
            
            return await translateAPICall(dataForPOST, textToTranslate);
        }

        function setURLForAPI(languageCode, textToTranslate) {
            let target = languageCode;
            let text = textToTranslate;
            let params = '?to=' + target + '&text=' + encodeURI(text);
            
            $scope.host = 'api.microsofttranslator.com';
            $scope.path = '/V2/Http.svc/Translate' + params;
        }
        
        async function translateAPICall(dataForPOST, textToTranslate) {
            return await $http.post('http://localhost:3000/api/translate', dataForPOST)
                .then( (response) => {
                    return response.data;
                })
                .catch( (err) => {
                    console.log(err);
                });
        }

        $scope.directionsRequested = false;
        $scope.ifStepsTranslated = false;
        $scope.stepsForDirections = ['', '', ''];

        $scope.translateSteps = async function() {
            $scope.ifStepsTranslated = true;
            $scope.stepsTranslated = await translateText($scope.steps, 'giver');

            // Update view after async/await
            $scope.$apply();
        }
    }
]);
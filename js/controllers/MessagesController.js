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

        let receiverText1 = ", enter your directions request: ";
        let receiverText2 = "I need directions from ";
        let receiverButtonText = "Submit Request";
        let receiverStepsHeader = "Translated Steps: ";

        let giverText1 = " needs directions from ";
        let giverText2 = "Provide the directions here: ";
        let giverButtonText = "Translate Steps";

        async function getAllText() {
            $scope.translatedReceiverText1 = await translateText(receiverText1, "giver");
            $scope.translatedReceiverText2 = await translateText(receiverText2, "giver");
            $scope.translatedReceiverButtonText = await translateText(receiverButtonText, "giver");
            $scope.translatedReceiverStepsHeader = await translateText(receiverStepsHeader, "giver");

            $scope.translatedGiverText1 = await translateText(giverText1, "receiver");
            $scope.translatedGiverText2 = await translateText(giverText2, "receiver");
            $scope.translatedGiverButtonText = await translateText(giverButtonText, "receiver");
        
            // Update view after async/await
            $scope.$apply();
        }

        getAllText();
        

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
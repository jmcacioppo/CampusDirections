campusDirections.controller('MessagesController', ['$scope', 'Messages', 'TransferData', 'Notification', '$location', '$http', 'TRANSLATOR_SUBSCRIPTION',
    function($scope, Messages, TransferData, Notification, $location, $http, TRANSLATOR_SUBSCRIPTION) {        
        $scope.user = TransferData.getUser();
        var host = '';
        var path = '';

        function setLanguageCode(language) {
            var code = '';
            
            switch(language) {
                case 'English': 
                    code = 'en'; 
                    break;
                case 'Spanish': 
                    code = 'es'; 
                    break;
            }

            return code;
        }

        function setLanguages() {
            var receiveLanguage = $scope.user.receiveLanguage;
            var giveLanguage = $scope.user.giveLanguage;

            var receiveCode = setLanguageCode(receiveLanguage);
            var giveCode = setLanguageCode(giveLanguage);

            console.log(receiveCode, giveCode);
        }

        function setURL() {
            let target = 'fr-fr';
            let text = 'Hello';
            let params = '?to=' + target + '&text=' + encodeURI(text);
            
            host = 'api.microsofttranslator.com';
            path = '/V2/Http.svc/Translate' + params;
        }

        function TranslateText() {
            var data = {
                key : TRANSLATOR_SUBSCRIPTION.key,
                host: host,
                path: path
            }
            
            $http.post('http://localhost:3000/api/translate', data)
                .then( (response) => {
                    console.log(response);
                })
                .catch( (err) => {
                    console.log(err);
                });
        }
        
        setLanguages();
        setURL();
        TranslateText();

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
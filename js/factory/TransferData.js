angular.module('campusDirections')
    .factory('TransferData', TransferData)

function TransferData() {
    var savedUserData = {};
    
    function setUser(userData) {
        savedUserData = userData;
    }
    
    function getUser() {
        return savedUserData;
    }
    
    return {
        setUser: setUser,
        getUser: getUser
    };
}
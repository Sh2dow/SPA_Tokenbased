app.factory('signUpService', ['$http', function ($http) {

    var signUpServiceFactory = {};

    signUpServiceFactory.saveRegistration = function (registration) {
        return $http.post('/api/Account/Register', registration)
    };

    return signUpServiceFactory;
}]);
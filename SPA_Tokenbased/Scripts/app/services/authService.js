'use strict';

var AuthApp = angular.module('AuthApp', []);

AuthApp.factory('authInterceptorService', ['$q', '$injector', '$window', '$cookieStore', function ($q, $injector, $window, $cookieStore) {

    var authInterceptorServiceFactory = {
    };

    authInterceptorServiceFactory.request = function (config) {

        config.headers = config.headers || {
        };

        //var authData = localStorageService.get('authorizationData');
        var authData = $cookieStore.get('auth_data');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    authInterceptorServiceFactory.responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = $cookieStore.get('authorizationData');
            //authService.logOut();
        }
        return $q.reject(rejection);
    };

    return authInterceptorServiceFactory;

}]);


AuthApp.factory('authService', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore) {
    var authServiceFactory = {
    };

    var userData = {
        isAuthenticated: false,
        username: '',
        bearerToken: '',
        expirationDate: null,
        roles: []
    };

    authServiceFactory.saveData = function () {
        authServiceFactory.removeData();
        $cookieStore.put('auth_data', userData);
    }

    authServiceFactory.removeData = function () {
        $cookieStore.remove('auth_data');
    }

    authServiceFactory.retrieveSavedData = function () {
        var savedData = $cookieStore.get('auth_data');
        if (typeof savedData === 'undefined') {
            throw new AuthenticationRetrievalException('No authentication data exists');
        } else if (isAuthenticationExpired(savedData.expirationDate)) {
            throw new AuthenticationExpiredException('Authentication token has already expired');
        } else {
            userData = savedData;
            authServiceFactory.setHttpAuthHeader();
        }
    }

    authServiceFactory.clearUserData = function () {
        userData.isAuthenticated = false;
        userData.username = '';
        userData.bearerToken = '';
        userData.expirationDate = null;
        userData.roles = null;

    }

    authServiceFactory.setHttpAuthHeader = function () {
        $http.defaults.headers.common.Authorization = 'Bearer ' + userData.bearerToken;
    }

    authServiceFactory.isAuthenticated = function () {
        if (userData.isAuthenticated && !isAuthenticationExpired(userData.expirationDate)) {
            return true;
        } else {
            try {
                retrieveSavedData();
            } catch (e) {
                throw new NoAuthenticationException('Authentication not found');
            }
            return true;
        }
    };

    authServiceFactory.getUserData = function () {
        return userData;
    };

    authServiceFactory.saveRegistration = function (registration) {

        authServiceFactory.logOut();

        return $http.post('/api/account/register', registration)
    };

    authServiceFactory.removeAuthentication = function () {
        authServiceFactory.removeData();
        authServiceFactory.clearUserData();
        $http.defaults.headers.common.Authorization = null;
    };

    authServiceFactory.login = function (loginData) {
        authServiceFactory.removeAuthentication();

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post('token', data, {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (data) {
            $cookieStore.remove('auth_data');
            $cookieStore.put('auth_data', data);

            userData.isAuthenticated = true;
            userData.username = data.userName;
            userData.bearerToken = data.access_token;
            userData.expirationDate = new Date(data['.expires']);
            userData.roles = data.roles;
            authServiceFactory.setHttpAuthHeader();
            if (loginData.persistData === true) {
                authServiceFactory.saveData();
            }

            deferred.resolve(data);
        }).catch(function (err) {
            //_logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    authServiceFactory.logOut = function () {

        $cookieStore.remove('authorizationData');

        userData.isAuthenticated = false;
        userData.userName = "";
    };

    authServiceFactory.fillAuthData = function () {
        var authData = $cookieStore.get('authorizationData');
        if (authData) {
            userData.isAuthenticated = true;
        }
        else {
            userData.isAuthenticated = false;
        }
    };

    authServiceFactory.changePassword = function (passwordData) {

        return $http.post('/api/Manage/ChangePassword', passwordData)

    };

    return authServiceFactory;
}]);
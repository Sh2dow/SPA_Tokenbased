'use strict';

var AuthApp = angular.module('AuthApp', []);

AuthApp.run(function ($http, $cookies, $cookieStore) {
    //If a token exists in the cookie, load it after the app is loaded, so that the application can maintain the authenticated state.
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('_Token');
    $http.defaults.headers.common.RefreshToken = $cookieStore.get('_RefreshToken');
});


//GLOBAL FUNCTIONS - pretty much a root/global controller.
//Get username on each page
//Get updated token on page change.
//Logout available on each page.
AuthApp.run(function ($rootScope, $http, $cookies, $cookieStore) {

    $rootScope.Logout = function () {

        $http.post('/api/Account/Logout')
            .then(function (data) {
                $http.defaults.headers.common.Authorization = null;
                $http.defaults.headers.common.RefreshToken = null;
                $cookieStore.remove('_Token');
                $cookieStore.remove('_RefreshToken');
                $rootScope.username = '';
                $rootScope.loggedIn = false;
                window.location = '/login';
            }).catch(function (data) {
                if (typeof data != "undefined") {
                    var error = data.data.Message.replace(/["']{1}/gi, "");
                    console.log(error);
                }
            });

    }

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if ($http.defaults.headers.common.RefreshToken != null) {
            var params = "grant_type=refresh_token&refresh_token=" + $http.defaults.headers.common.RefreshToken;
            $http({
                url: '/Token',
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: params
            })
            .then(function (data) {
                $http.defaults.headers.common.Authorization = "Bearer " + data.access_token;
                $http.defaults.headers.common.RefreshToken = data.refresh_token;

                $cookieStore.put('_Token', data.access_token);
                $cookieStore.put('_RefreshToken', data.refresh_token);

                if (typeof data.data.userName != "undefined") {
                    console.log(data.data.userName);
                    $rootScope.username = data.data.userName.replace(/["']{1}/gi, "");//Remove any quotes from the username before pushing it out.
                    $rootScope.loggedIn = true;
                }
                else
                    $rootScope.loggedIn = false;
            })
            .catch(function (error) {
                console.log(error);
                $rootScope.loggedIn = false;
            });
        }
    });
});


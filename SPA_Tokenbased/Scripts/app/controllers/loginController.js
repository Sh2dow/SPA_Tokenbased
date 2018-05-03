app.controller('loginController', function ($scope, $rootScope, $http, $cookies, $cookieStore, $state, $routeParams) {
    $scope.message = $routeParams.message;
    $scope.Login = function () {
        $scope.showMessage = false;
        var params = "grant_type=password&username=" + $scope.loginData.username + "&password=" + $scope.loginData.password;
        $http.post('/Token', params, {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (data) {
            $http.defaults.headers.common.Authorization = "Bearer " + data.data.access_token;
            $http.defaults.headers.common.RefreshToken = data.data.refresh_token;

            $cookieStore.put('_Token', data.data.access_token);
            $cookieStore.put('username', data.data.userName);
            $cookieStore.put('roles', data.data.roles);
            $cookieStore.put('accessToken', data.data.access_token);
            $cookieStore.put('refreshToken', data.data.refresh_token);

            //window.location = '/';
            $state.go('dashboard', {}, { reload: false })
                .then(function () {
                    setTimeout(function () {
                        //location.reload(true);
                    });
                })
        }).catch(function (data) {
            $scope.message = data.data.replace(/["']{1}/gi, "");
            $scope.showMessage = true;
        });
    }
});
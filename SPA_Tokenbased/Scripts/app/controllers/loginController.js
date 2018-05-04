app.controller('loginController', function ($scope, $rootScope, $http, $cookies, $state, $routeParams) {
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

            $cookies.put('_Token', data.data.access_token);
            $cookies.put('username', data.data.userName);
            $cookies.put('roles', data.data.roles);
            $cookies.put('accessToken', data.data.access_token);
            $cookies.put('refreshToken', data.data.refresh_token);
            $cookies.put('loggedIn', true);

            //window.location = '/';

            $rootScope.isAdmin = $cookies.get('roles') == '["Admin"]';
            $rootScope.loggedIn = true;
            setTimeout(function () {
                $state.go('user.dashboard')
            });
        }).catch(function (data) {
            console.log(data);
            $scope.message = data.data.replace(/["']{1}/gi, "");
            $scope.showMessage = true;
        });
    }
});
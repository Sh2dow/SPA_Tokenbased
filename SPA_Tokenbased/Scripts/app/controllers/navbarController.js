
app.controller('navbarController', function ($scope, $rootScope, $cookies) {

    $scope.init = function () {
        if (typeof $rootScope.loggedIn == 'undefined') $rootScope.loggedIn = $cookies.get('loggedIn');
        if (typeof $rootScope.isAdmin == 'undefined') $rootScope.isAdmin = $cookies.get('roles') == '["Admin"]';
    }

    $scope.getAdminCookie = function () {
        $rootScope.loggedIn = $cookies.get('loggedIn');
        $rootScope.isAdmin = $cookies.get('roles') == '["Admin"]';
        return $rootScope.loggedIn && $rootScope.isAdmin;
    };

    $scope.init();
})
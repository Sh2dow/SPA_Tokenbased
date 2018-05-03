app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.controller('dashboardController', ['$scope', function ($scope) {

    $scope.init = function () {
        
    }

    $scope.init();

}])
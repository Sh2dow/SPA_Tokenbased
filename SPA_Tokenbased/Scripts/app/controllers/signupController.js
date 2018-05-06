'use strict';

app.controller('signupController', ['$scope', '$state', 'signUpService',
function ($scope, $state, signUpService) {

    $scope.init = function () {
        $scope.isProcessing = false;
        $scope.RegisterBtnText = "Register";
    };

    $scope.init();

    $scope.registration = {
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    };

    $scope.signUp = function () {
        $scope.isProcessing = true;
        $scope.RegisterBtnText = "Please wait...";
        signUpService.saveRegistration($scope.registration).then(function (response) {
            alert("Registration Successfully Completed. Please sign in to Continue.");
            //$state.go('home.login');
            $state.reload();
        }, function () {
            alert("Error occured. Please try again.");
            $scope.isProcessing = false;
            $scope.RegisterBtnText = "Register";
        });
    };

}]);
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.controller('manageRoleController', ['$scope', 'manageRoleService', function ($scope, manageRoleService) {

    $scope.init = function () {
        manageRoleService.GetAllRoles().then(function (response) {
            $scope.Roles = response.data;
        }, function () {
            alert("Failed!");
        })
    }

    $scope.init();

    $scope.createRole = function () {
        manageRoleService.CreateRole($scope.RoleName).then(function () {
            $scope.init();
        }, function () {
            alert("Failed to Create");
        })
    }

    $scope.DeleteRole = function (Id) {
        manageRoleService.DeleteRole(Id).then(function () {

            alert("Deleted");
            $scope.init();

        }, function () {
            alert("Failed to Delete.Try Again");
        })
    }


}])
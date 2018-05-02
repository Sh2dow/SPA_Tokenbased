app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.controller('userController', ['$scope', 'manageUserRoleService', function ($scope, manageUserRoleService) {

    $scope.init = function () {
        manageUserRoleService.GetAllUsers().then(function (response) {
            $scope.Users = response.data;
        }, function () {
            alert("Failed.");
        })
    }

    $scope.init();

    $scope.ViewUser = function (user) {
        $scope.viewUser = angular.copy(user);
    }

    $scope.DeleteUser = function (id) {
        manageUserRoleService.DeleteUser(id).then(function () {
            alert("Deleted Successfully.");
            $scope.init();
        }, function () {
            alert("Failed");
        })
    }

    //roles management

    $scope.GetRoles = function (user) {
        $scope.SelectedUser = angular.copy(user);
        $scope.selection = [];

        manageUserRoleService.GetAllRoles().then(function (response) {
            $scope.Roles = response.data;

            if ($scope.SelectedUser.Roles != null) {
                for (var i = 0; i < $scope.SelectedUser.Roles.length; i++) {
                    $scope.selection.push($scope.SelectedUser.Roles[i].RoleId)
                }
            }

        }, function () {
            alert("Failed");
        })
    }

    $scope.selection = [];
    // toggle selection for a given employee by name
    $scope.toggleSelection = function toggleSelection(roleId) {
        //alert(role);
        var idx = $scope.selection.indexOf(roleId);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selection.push(roleId);
        };
    };

    $scope.UpdateUserRoles = function () {
        manageUserRoleService.AddUpdateToRoles($scope.SelectedUser.id, $scope.selection).then(function () {
            $scope.init();
            alert("User roles added successfully.");
        }, function () {
            alert("Failed to add roles.Please try again.");
        });
    };

}])
app.controller('userController', function (
    $scope,
    manageUserService,
    manageTimeService,
    $compile) {

    $scope.init = function () {
        _initUsersGrid();
    }

    function _initUsersGrid() {
        if (typeof usersGrid !== 'undefined') {
            $scope.userGrid = usersGrid.init($scope, $compile);
        }
    }

    $scope.init();

    $scope.ViewTracking = function (userId) {
        manageTimeService.GetUserTracks(userId).then(function (response) {
            $scope.timeTracks = response.data;
        }, function () {
            alert("Failed.");
        })
    }

    $scope.ViewUser = function (user) {
        $scope.viewUser = angular.copy(user);
    }

    $scope.DeleteUser = function (id) {
        manageUserService.DeleteUser(id).then(function () {
            alert("Deleted Successfully.");
            $scope.init();
        }, function () {
            alert("Failed");
        })
    }

    //roles management

    $scope.GetRoles = function (userId) {

        manageUserService.GetRoles(userId).then(function (response) {
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
        manageUserService.AddUpdateToRoles($scope.SelectedUser.id, $scope.selection).then(function () {
            $scope.init();
            alert("User roles added successfully.");
        }, function () {
            alert("Failed to add roles.Please try again.");
        });
    };

})
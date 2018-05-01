app.factory('manageUserRoleService', ['$http', function ($http) {

    var manageUserRoleServiceFactory = {};
    
    manageUserRoleServiceFactory.GetAllUsers = function () {
        return $http.get("/api/Users/GetAll", { withCredentials: true })
    };

    manageUserRoleServiceFactory.GetAllRoles = function (userId) {
        return $http.get("/api/Roles/GetAll", { withCredentials: true })
    };

    manageUserRoleServiceFactory.AddUpdateToRoles = function (userId, roles) {
        return $http.post("/api/UserRoles?userId=" + userId, roles)
    };

    manageUserRoleServiceFactory.DeleteUser = function (id) {
        return $http.delete('/api/UserRoles/' + id)
    }

    return manageUserRoleServiceFactory;

}]);
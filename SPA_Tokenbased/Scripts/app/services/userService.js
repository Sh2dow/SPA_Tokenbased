app.factory('manageUserService', ['$http', function ($http) {

    var manageUserServiceFactory = {};
    
    manageUserServiceFactory.GetAllUsers = function () {
        return $http.get("api/User/GetAll", { withCredentials: true })
    };

    manageUserServiceFactory.GetRoles = function (userId) {
        return $http.get('api/User/GetRoles?userId=' + userId, { withCredentials: true })
    };

    manageUserServiceFactory.AddUpdateToRoles = function (userId, roles) {
        return $http.post("api/User/AddToRole?userId=" + userId, roles)
    };

    manageUserServiceFactory.DeleteUser = function (userId) {
        return $http.delete('api/User/Delete' + userId)
    }

    return manageUserServiceFactory;

}]);
app.factory('manageRoleService', ['$http', function ($http) {

    var manageRoleAppfactory = {};

    manageRoleAppfactory.GetAllRoles = function () {
        return $http.get('api/Roles/GetAll')
    }

    manageRoleAppfactory.CreateRole = function (newRoleName) {
        return $http.post('api/Role/Add?Name=' + newRoleName)
    }

    manageRoleAppfactory.DeleteRole = function (id) {
        return $http.delete('api/Role/Delete' + id)
    }

    return manageRoleAppfactory;

}])
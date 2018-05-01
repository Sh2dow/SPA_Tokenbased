app.factory('manageRoleService', ['$http', function ($http) {

    var manageRoleAppfactory = {};

    manageRoleAppfactory.GetAllRoles = function () {
        return $http.get('/api/Roles')
    }

    manageRoleAppfactory.CreateRole = function (newRoleName) {
        return $http.post('/api/Roles?Name=' + newRoleName)
    }

    manageRoleAppfactory.DeleteRole = function (id) {
        return $http.delete('/api/Roles/' + id)
    }

    return manageRoleAppfactory;

}])
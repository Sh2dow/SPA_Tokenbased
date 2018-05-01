app.factory('userService', ['$http', function ($http) {

    var fac = {};

    fac.GetAllUsers = function () {
        return $http.get('/api/Users/GetAll', { withCredentials: true })
    }

    return fac;

}])

app.factory('manageTimeService', ['$http', function ($http) {

    var fac = {};

    fac.submitTime = function (data) {
        return $http.post('/api/Time/SubmitTime', data)
    };

    return fac;

}])

app.factory('manageTimeService', ['$http', function ($http) {

    var fac = {};

    fac.submitTime = function (data) {
        return $http.post('/api/Time/SubmitTime', data)
    };

    fac.GetUserTracks = function (userId) {
        return $http.get("/api/Time/GetTracks?userId=" + userId)
    };

    return fac;

}])
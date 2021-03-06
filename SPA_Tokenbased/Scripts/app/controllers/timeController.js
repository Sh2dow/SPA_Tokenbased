﻿app.controller('timeController', function ($scope, $cookies, manageTimeService) {

    $scope.time = {
        start: moment().subtract(8, 'hours').format('YYYY-MM-DD h:mm A'),
        end: moment().format('YYYY-MM-DD h:mm A'),
        username: ''
    };
        
    $scope.trackTime = function () {
        $scope.time.username = $cookies.get('username');
        manageTimeService.submitTime($scope.time).then(function (data) {
            alert(data.statusText);
        }, function (error) {
            alert(error.statusText);
        })
    }
})

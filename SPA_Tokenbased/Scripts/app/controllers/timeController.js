app.controller('timeController', ['$scope', 'manageTimeService', function ($scope, manageTimeService) {

    $scope.time = {
        start: moment().format(),
        end: moment().format(),
    };
        
    $scope.trackTime = function () {

        manageTimeService.submitTime($scope.time).then(function (response) {
            $scope.message = response;
        }, function (error) {
            $scope.message = error;
        })
        alert($scope.message);
    }

    $scope.init();

}])

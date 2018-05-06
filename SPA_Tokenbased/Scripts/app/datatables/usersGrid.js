var usersGrid = function () {

    var $scope;
    var $compile;

    var handleRecords = function () {

        var grid = new Datatable();

        var columns = [
            {
                data: 'fullname',
                sortable: false,
            },
            {
                data: 'totalHours',
                sortable: false,
            },
            {
                data: null,
                sortable: false,
                render: _renderActionButtons
            }
        ];

        grid.init({
            src: $("#users"),
            dataTable: {
                "ajax": {
                    'url': '/api/User/GetAll',
                    'method': 'GET',
                },
                "serverSide": false,
                "paging": true,
                "bRetrieve": true,
                "pagingType": 'full_numbers',
                "ordering": false,
                "scrollY": '42em',
                "columns": columns,
                "createdRow": function (row, data, index) {
                    $compile(row)($scope);
                },
            }
        });

        return grid;
    }

    function _renderActionButtons(data, type, row, meta) {
        var id = data["id"];
        return '<a class="btn btn-xs btn-success" data-toggle="modal" data-target="#trackingModal" ng-click="ViewTracking(\'' + id + '\')">View</a>';
    }

    return {

        //main function to initiate the module
        init: function (scope, compile) {
            $scope = scope;
            $compile = compile;
            return handleRecords();
        }
    };

}();
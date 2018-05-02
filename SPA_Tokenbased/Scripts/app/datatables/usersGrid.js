var usersGrid = function () {

    var $scope;
    var $compile;
    var grid = null;

    var handleRecords = function (filter) {

        grid = new Datatable().setScopeLanguage($scope);

        // adding default filter values
        for (var i in filter) {
            grid.setAjaxParam(i, filter[i]);
        }

        var columns = [
            {
                data: "code",
                sortable: false
            },
            {
                data: "name",
                sortable: false
            },
            {
                data: null,
                sortable: false,
                render: function (data) { return data.address.state.abbreviation }
            },
            {
                data: "assignmentTitle",
                sortable: false
            }
        ];

        grid.init({
            src: $("#agencies"),
            dataTable: {
                "paging": false,
                "info": false,
                "ajax": {
                    "url": "/api/agency/filter",
                },
                "scrollY": "210px",
                "scrollCollapse": false,
                "columns": columns,
                "createdRow": function (row, data, index) {

                    $(row).prop('id', data.id);
                    $(row).on('click', function (event) {
                        $('.selected-row').removeClass('selected-row');
                        $(this).addClass('selected-row');
                        $scope.$apply($scope.selectedEntity = data);
                    });

                },
                "order": [],
                "initComplete": function (settings, json) {
                    var $scb = $('#tpe_wrapper').find('.dataTables_scrollBody');
                    Metronic.initSlimScroll($scb);
                },
            }
        });

        $('#tpe_wrapper').css('margin-top', 0);

        return grid;
    }

    return {

        filter: function (filter) {
            for (var i in filter) {
                grid.setAjaxParam(i, filter[i]);
            }
            grid.getDataTable().api().ajax.reload();
        },

        //main function to initiate the module
        init: function (scope, compile, filter) {
            $scope = scope;
            $compile = compile;
            return handleRecords(filter);
        }
    };

}();

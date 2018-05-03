app.config(
    function ($provide, $routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
    
        $httpProvider.defaults.withCredentials = true;

        //================================================
        // Ignore Template Request errors if a page that was requested was not found or unauthorized.  The GET operation could still show up in the browser debugger, but it shouldn't show a $compile:tpload error.
        //================================================
        $provide.decorator('$templateRequest', ['$delegate', function ($delegate) {
            var mySilentProvider = function (tpl, ignoreRequestError) {
                return $delegate(tpl, true);
            }
            return mySilentProvider;
        }]);

        //================================================
        // Add an interceptor for AJAX errors
        //================================================
        $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
            return {
                'responseError': function (response) {
                    if (response.status === 401)
                        $location.url('#/');
                    return $q.reject(response);
                }
            };
        }]);

    //$httpProvider.defaults.withCredentials = true;

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'Account/Login',
            controller: 'loginController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'Account/Signup',
            controller: 'signupController'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'User/Dashboard',
            controller: 'dashboardController'
        })

        .state('users', {
            url: '/users',
            templateUrl: 'User/Users',
            controller: 'userController'
        })

        .state('roles', {
            url: '/roles',
            templateUrl: 'User/Roles',
            controller: 'manageRoleController'
        })

});
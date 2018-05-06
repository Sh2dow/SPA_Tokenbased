app.config(
    function ($provide, $routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
        //$httpProvider.defaults.withCredentials = true;

        //================================================
        // Ignore Template Request errors if a page that was requested was not found or unauthorized.  
        // The GET operation could still show up in the browser debugger, but it shouldn't show a $compile:tpload error.
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
                        $location.url('home.login');
                    return $q.reject(response);
                }
            };
        }]);

        $urlRouterProvider.otherwise('/home/login');

        $stateProvider
            .state('home', {
                abstract: true,
                url: '/home',
                // Note: abstract still needs a ui-view for its children to populate.
                // You can simply add it inline here.
                template: '<ui-view/>'
            })
            .state('home.login', {
                // url will become '/home/login'
                url: '/login',
                templateUrl: 'Account/Login',
                controller: 'loginController',
                parent: "home",
            })
            .state('home.signup', {
                // url will become '/home/signup'
                url: '/signup',
                templateUrl: 'Account/Signup',
                controller: 'signupController',
                parent: "home",
            })

            .state('user', {
                abstract: true,
                url: '/user',
                template: '<ui-view/>'
            })
            .state('user.dashboard', {
                authenticate: true,
                url: '/dashboard',
                templateUrl: 'User/Dashboard',
            })
            .state('user.users', {
                url: '/users',
                templateUrl: 'User/Users',
                controller: 'userController',
                parent: "user",
            })
            .state('user.roles', {
                url: '/roles',
                templateUrl: 'User/Roles',
                controller: 'manageRoleController',
                parent: "user",
            })
            .state('user.test', {
                url: '/test',
                templateUrl: 'User/Test',
                parent: "user",
            })

        $urlRouterProvider.otherwise('/');
    });
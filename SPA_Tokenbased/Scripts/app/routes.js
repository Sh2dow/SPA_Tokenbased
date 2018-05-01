app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
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
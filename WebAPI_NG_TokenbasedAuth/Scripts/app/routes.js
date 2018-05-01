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

        .state('changePassword', {
            url: '/changePassword',
            templateUrl: 'Account/changePassword',
            controller: 'changePasswordController'
        })

        .state('resetPassword', {
            url: '/resetPassword',
            templateUrl: 'Account/resetPassword',
            controller: 'resetPasswordController'
        })

        .state('forgotPassword', {
            url: '/forgotPassword',
            templateUrl: 'Account/forgotPassword',
            controller: 'forgotPasswordController'
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
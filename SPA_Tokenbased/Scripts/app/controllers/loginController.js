app.controller('_loginController', ['$scope', '$location', '$state', 'authService', function ($scope, $location, $state, authService) {
    $scope.init = function () {
        $scope.isProcessing = false;
        $scope.LoginBtnText = "Sign In";
    }

    $scope.init();

    $scope.loginData = {
        username: '',
        password: '',
        persist: false,
        errors: []
    }

    $scope.Login = function () {
        $scope.isProcessing = true;
        $scope.LoginBtnText = "Signing in.....";

        authService.login($scope.loginData)
            .then(function (response) {
                alert("Login Successfully");
                $state.go('dashboard', {}, { reload: false })
                .then(function () {
                    setTimeout(function () {
                        location.reload(true);
                    });
                })

            }, function () {
                alert("Failed.Please try again.");
                $scope.init();
            })
    }

    $scope.Logout = function () {
        authService.logOut();
    }

}])


app.controller('loginController', function ($scope, loginservice) {

    //Scope Declaration
    $scope.responseData = '';

    $scope.username = '';
    $scope.password = '';

    $scope.userRegistrationEmail = '';
    $scope.userRegistrationPassword = '';
    $scope.userRegistrationConfirmPassword = '';

    $scope.userLoginEmail = '';
    $scope.userLoginPassword = '';

    $scope.accessToken = '';
    $scope.refreshToken = '';
    //Ends Here

    //Function to register user
    $scope.registerUser = function () {
        
        $scope.responseData = '';

        //The User Registration Information
        var userRegistrationInfo = {
            Email: $scope.userRegistrationEmail,
            Password: $scope.userRegistrationPassword,
            ConfirmPassword: $scope.userRegistrationConfirmPassword
        };
        
        var promiseregister = loginservice.register(userRegistrationInfo);

        promiseregister.then(function (resp) {
            $scope.responseData = "Successfully registered";
            $scope.userRegistrationEmail="";
            $scope.userRegistrationPassword="";
            $scope.userRegistrationConfirmPassword="";
        }, function (err) {
            $scope.responseData="Error " + err.status;
        });
    };


    $scope.redirect = function () {
        window.location.href = '/';
    };

    //Function to Login. This will generate Token 
    $scope.Login = function () {
        //This is the information to pass for token based authentication

        //var loginData = {
        //    grant_type: 'password',
        //    username: $scope.username,
        //    password: $scope.password
        //};

        var promiselogin = loginservice.login($scope.loginData);

        promiselogin.then(function (resp) {
            
            $scope.username = resp.data.username;
            //Store the token information in the SessionStorage
            //So that it can be accessed for other views
            sessionStorage.setItem('username', resp.data.username);
            sessionStorage.setItem('accessToken', resp.data.access_token);
            sessionStorage.setItem('refreshToken', resp.data.refresh_token);
            //window.location.href = '/Employee/Index';
            window.location.href = '/';
        }, function (err) {
            
            $scope.responseData="Error " + err.status;
        });

    };

    //Logout
    $scope.Logout = function () {
        console.log('logout');
        $scope.username = '';
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/';
    }

    //Utility
    $scope.getCookie = function (name) {
        var cookiename = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length, c.length);
        }
        return null;
    }

    $scope.isLoggedIn = function () {
        return getCookie("userid") != null;
    }

});

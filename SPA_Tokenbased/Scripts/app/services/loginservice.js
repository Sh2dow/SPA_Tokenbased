app.service('loginservice', function ($http) {

    this.register = function (userInfo) {
        var resp = $http({
            url: "/api/Account/Register",
            method: "POST",
            data: userInfo,
        });
        return resp;
    };

    this.login = function (loginData) {
        
        var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;

        return $http.post('/token', data, {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    };

    this.logout = function () {
        
    };
});
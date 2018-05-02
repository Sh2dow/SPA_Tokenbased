//The Service Containing functions for Register User and 
//User Login
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

        //var resp = $http({
        //    url: "/TOKEN",
        //    method: "POST",
        //    data: $.param({ grant_type: 'password', username: loginData.username, password: loginData.password }),
        //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //});
        //return resp;
    };

    this.logout = function () {
        
    };
});
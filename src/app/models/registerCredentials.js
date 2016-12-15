/**
 * Created by baunov on 06/12/16.
 */
"use strict";
var RegisterCredentials = (function () {
    function RegisterCredentials(username, password, email, name) {
        if (username === void 0) { username = ""; }
        if (password === void 0) { password = ""; }
        if (email === void 0) { email = ""; }
        if (name === void 0) { name = ""; }
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }
    return RegisterCredentials;
}());
exports.RegisterCredentials = RegisterCredentials;

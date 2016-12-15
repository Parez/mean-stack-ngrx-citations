/**
 * Created by baunov on 06/12/16.
 */
"use strict";
var LoginCredentials = (function () {
    function LoginCredentials(cred, pass) {
        if (cred === void 0) { cred = ""; }
        if (pass === void 0) { pass = ""; }
        this.cred = cred;
        this.pass = pass;
    }
    return LoginCredentials;
}());
exports.LoginCredentials = LoginCredentials;

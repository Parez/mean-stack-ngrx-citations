/**
 * Created by baunov on 14/10/16.
 */
"use strict";
var User = (function () {
    function User(username, password, email, name, rank) {
        if (username === void 0) { username = ""; }
        if (password === void 0) { password = ""; }
        if (email === void 0) { email = ""; }
        if (name === void 0) { name = ""; }
        if (rank === void 0) { rank = 0; }
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.rank = rank;
        this._id = "";
        //this._id = String(User.curId);
        //User.curId++;
    }
    User.localUser = new User();
    User.token = "";
    User.curId = 0;
    return User;
}());
exports.User = User;

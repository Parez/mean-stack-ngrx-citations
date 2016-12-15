"use strict";
/**
 * Created by baunov on 14/10/16.
 */
var user_1 = require("../models/user");
var TestUsersDB = (function () {
    function TestUsersDB() {
        this.userArray = [];
        this.userArray.push(new user_1.User("Sugrow", "parugvai", "parezguru@gmail.com", "Daniil Baunov"));
        this.userArray.push(new user_1.User("Pikin", "par1234", "pikin@gmail.com", "Sanya Pikin"));
        this.userArray.push(new user_1.User("Polina", "asiuy", "polyna@gmail.com", "Polyna Mlafeeva"));
        this.userArray.push(new user_1.User("Veteran", "pjhgf", "vitor@gmail.com", "Viktor Semisinov"));
        this.userArray.push(new user_1.User("DashaGul", "lulhfljhf", "vitor@gmail.com", "Viktor Semisinov"));
    }
    TestUsersDB.prototype.getById = function (id) {
        for (var i = 0; i < this.userArray.length; i++) {
            if (this.userArray[i]._id == id) {
                return this.userArray[i];
            }
        }
        return new user_1.User("No such user");
    };
    TestUsersDB.prototype.addUser = function (user) {
        this.userArray.push(user);
        return user_1.User.curId;
    };
    TestUsersDB.prototype.signIn = function (email, password) {
        this.userArray.forEach(function (user) {
            if (user.email == email && user.password == password) {
                return user;
            }
        });
        return null;
    };
    return TestUsersDB;
}());
exports.TestUsersDB = TestUsersDB;

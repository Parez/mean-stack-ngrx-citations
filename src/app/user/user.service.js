"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require("../models/user");
var TestUsersDB_1 = require("./TestUsersDB");
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var _ = require('lodash');
var UserService = (function () {
    function UserService(http) {
        var _this = this;
        this.http = http;
        this.usersUrl = "users/";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        UserService.db = new TestUsersDB_1.TestUsersDB();
        if (localStorage.getItem('currentUser') != null) {
            console.log("User logged in");
            user_1.User.token = JSON.parse(localStorage.getItem('currentUser')).token;
            this.headers.append('x-auth', user_1.User.token);
            this.getProfileInfo().subscribe(function (user) {
                user_1.User.localUser = _.pick(user, ["name", "username", "email", "followers", "rank", "_id"]);
            }, function (error) {
                _this.handleError(error);
            });
        }
    }
    UserService.prototype.addUser = function (user) {
        var userId = UserService.db.addUser(user);
        return new Rx_1.Observable(function (observer) { return observer.next(userId); });
    };
    //register user. Return true if registration was successful.
    //once registered - user is automatically logged in (e.g. auth-token is saved)
    //user object should contain registration info
    UserService.prototype.signUp = function (registerCred) {
        var _this = this;
        return this.http.post(this.usersUrl + 'signup', registerCred, this.options).map(function (response) {
            // registration successful if there's a jwt token in the response header
            if (response.headers.has('x-auth')) {
                //store token and user in the service for further easy access
                user_1.User.localUser = _.pick(response.json(), ["name", "username", "email", "followers", "rank", "_id"]);
                user_1.User.token = response.headers.get('x-auth');
                localStorage.setItem('currentUser', JSON.stringify({ username: response.json().username, token: user_1.User.token }));
                _this.headers.set('x-auth', user_1.User.token);
                return true;
            }
            return false;
        });
    };
    UserService.prototype.signIn = function (loginCred) {
        var _this = this;
        //log in using login credentials (cred and pass); returns true if login was successful
        return this.http.post(this.usersUrl + 'signin', loginCred, this.options).map(function (response) {
            // login successful if there's a jwt token in the response header
            if (response.headers.has('x-auth')) {
                //store token and user in the service for further easy access
                user_1.User.localUser = _.pick(response.json(), ["name", "username", "email", "followers", "rank", "_id"]);
                user_1.User.token = response.headers.get('x-auth');
                localStorage.setItem('currentUser', JSON.stringify({ username: response.json().username, token: user_1.User.token }));
                _this.headers.set('x-auth', user_1.User.token);
                return true;
            }
            return false;
        });
    };
    UserService.prototype.signOut = function () {
        // clear token remove user from local storage to log user out
        user_1.User.token = null;
        user_1.User.localUser = null;
        localStorage.removeItem('currentUser');
    };
    UserService.prototype.getProfileInfo = function () {
        var _this = this;
        this.options.headers.set('x-auth', user_1.User.token);
        return this.http.get(this.usersUrl + 'me', this.options).map(function (response) {
            return response.json();
        }, function (err) {
            _this.handleError(err);
        });
    };
    UserService.prototype.getUserById = function (id) {
        return this.http.get(this.usersUrl + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        //return new Observable<User>(observer => observer.next(UserService.db.getById(id)));
        /**/
    };
    UserService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("UsersService" + errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

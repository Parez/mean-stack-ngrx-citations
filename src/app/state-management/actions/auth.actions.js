"use strict";
exports.ActionTypes = {
    SIGN_IN: "[AUTH] SIGN_IN",
    AUTH_SUCCESS: "[AUTH] AUTH_SUCCESS",
    AUTH_FAILURE: "[AUTH] AUTH_FAILURE",
    SIGN_OUT: "[AUTH] SIGN_OUT",
    SIGN_UP: "[AUTH] SIGN_UP",
    LOAD_USER: "[AUTH] LOAD_USER"
};
var SignInAction = (function () {
    function SignInAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.SIGN_IN;
    }
    return SignInAction;
}());
exports.SignInAction = SignInAction;
var AuthSuccessAction = (function () {
    function AuthSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.AUTH_SUCCESS;
    }
    return AuthSuccessAction;
}());
exports.AuthSuccessAction = AuthSuccessAction;
var AuthFailureAction = (function () {
    //string containing error message
    function AuthFailureAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.AUTH_FAILURE;
    }
    return AuthFailureAction;
}());
exports.AuthFailureAction = AuthFailureAction;
var SignUpAction = (function () {
    function SignUpAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.SIGN_UP;
    }
    return SignUpAction;
}());
exports.SignUpAction = SignUpAction;
var SignOutAction = (function () {
    function SignOutAction() {
        this.type = exports.ActionTypes.SIGN_OUT;
    }
    return SignOutAction;
}());
exports.SignOutAction = SignOutAction;
var LoadUserAction = (function () {
    function LoadUserAction() {
        this.type = exports.ActionTypes.LOAD_USER;
    }
    return LoadUserAction;
}());
exports.LoadUserAction = LoadUserAction;

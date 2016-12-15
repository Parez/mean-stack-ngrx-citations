"use strict";
/**
 * Created by baunov on 29/10/16.
 */
var user_logic_1 = require('../db/logic/user.logic');
exports.auth = function (req, res, next) {
    var token = req.header('x-auth');
    user_logic_1.User.findByToken(token).then(function (user) {
        if (!user) {
            return Promise.reject(new Error('Auth failed'));
        }
        req.user = user;
        req.token = token;
        next();
    }).catch(function (e) {
        //Authentication error
        res.status(401).send();
    });
};

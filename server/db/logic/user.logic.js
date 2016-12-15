"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by baunov on 25/10/16.
 */
var user_model_1 = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var validator = require('validator');
var _ = require('lodash');
var SECRET_KEY = '1A39Zhr6JN4J3i2xvnRbkGYuwCAl1H9Qfh6HEa8CiKRKR32mSSiQhQqn8ZNrsgQ';
var User = (function (_super) {
    __extends(User, _super);
    /*
    static addNotification(userId: string, srcUserId: string, citationId: string, type: NotificationType): Promise <INotification> {
      return this.create({
        user: userId,
        srcUser: srcUserId,
        citation: citationId,
        type
      });
    }
    */
    function User(document) {
        _super.call(this);
        this._document = document;
    }
    User.createUserObj = function (username, password, email, name, followers) {
        if (password === void 0) { password = ''; }
        if (email === void 0) { email = ''; }
        if (name === void 0) { name = ''; }
        if (followers === void 0) { followers = []; }
        return {
            username: username,
            password: password,
            email: email,
            name: name,
            followers: followers
        };
    };
    //registers a new user. also hashes his password. returns newly-created user
    User.registerUser = function (user) {
        return bcrypt.genSalt(10).then(function (salt) {
            bcrypt.hash(user.password, salt).then(function (hash) {
                user.password = hash;
                return user.save();
            }).catch(function (err) {
                console.log('Error registering user ' + err);
            });
        });
    };
    User.comparePassword = function (candidatePassword, hash) {
        return bcrypt.compare(candidatePassword, hash).then(function (isMatch) {
            return isMatch;
        }).catch(function (err) {
            throw err;
        });
    };
    ;
    User.generateAuthToken = function (user) {
        var access = 'auth';
        return jwt.sign({ _id: user._id.toHexString(), access: access }, SECRET_KEY).toString();
    };
    ;
    User.findByToken = function (token) {
        var decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        }
        catch (error) {
            return Promise.reject(error);
        }
        return this.findOne({ _id: decoded._id }).exec();
    };
    ;
    //login either by email or username (when can be both)
    User.loginByCredential = function (cred, password) {
        if (validator.isEmail(cred)) {
            return User.loginByEmail(cred, password);
        }
        else {
            return User.loginByUsername(cred, password);
        }
    };
    User.loginByUsername = function (username, password) {
        return User.findOne({ username: username }).exec().then(function (user) {
            User.comparePassword(password, user.password).then(function (isMatch) {
                if (isMatch) {
                    Promise.resolve(user);
                }
                else {
                    Promise.reject(new Error('Login credentials do not match'));
                }
            });
        });
    };
    User.loginByEmail = function (email, password) {
        return User.findOne({ email: email }).exec().then(function (user) {
            User.comparePassword(password, user.password).then(function (isMatch) {
                if (isMatch) {
                    Promise.resolve(user);
                }
                else {
                    Promise.reject(new Error('Login credentials do not match'));
                }
            });
        });
    };
    User.prototype.getInfo = function () {
        return _.pick(this._document, ['_id', '_username', 'email', 'name', 'followers']);
    };
    User.prototype.getFollowers = function () {
        return User.find({ _id: { $in: this._document.followers } }).exec();
    };
    return User;
}(user_model_1.UserModel));
exports.User = User;
//Is called every time before saving a user. Hashes password if it's modified
user_model_1.UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10).then(function (salt) {
            return bcrypt.hash(user.password, salt);
        }).then(function (hash) {
            user.password = hash;
            next();
        }).catch(function (err) {
            //TODO: log error via winston
            console.log('Error while hashing password: ' + err);
        });
    }
    else {
        next();
    }
});

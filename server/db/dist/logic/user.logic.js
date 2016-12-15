"use strict";
/**
 * Created by baunov on 25/10/16.
 */
const user_model_1 = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const _ = require('lodash');
const SECRET_KEY = '1A39Zhr6JN4J3i2xvnRbkGYuwCAl1H9Qfh6HEa8CiKRKR32mSSiQhQqn8ZNrsgQ';
class User extends user_model_1.UserModel {
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
    constructor(document) {
        super(document);
        this._document = document;
    }
    static createUserObj(username = '', password = '', email = '', name = '', followers = []) {
        return {
            username,
            password,
            email,
            name,
            followers
        };
    }
    //registers a new user. also hashes his password. returns newly-created user
    static registerUser(user) {
        return new Promise((resolve, reject) => {
            (new User(user)).save().then((newUser) => {
                console.log("saved");
                resolve(newUser);
            }).catch((saveErr) => {
                console.log("can't save");
                reject(new Error('Could not save a user ' + saveErr.message));
            });
        });
    }
    static comparePassword(candidatePassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
                console.log(candidatePassword + " " + hash);
                if (err) {
                    reject(err);
                }
                resolve(isMatch);
            });
        });
    }
    ;
    static generateAuthToken(user) {
        let access = 'auth';
        return jwt.sign({ _id: user._id.toHexString(), access }, SECRET_KEY).toString();
    }
    ;
    static findByToken(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        }
        catch (error) {
            return Promise.reject(error);
        }
        return this.findOne({ _id: decoded._id }).exec();
    }
    ;
    //login either by email or username (when can be both)
    static loginByCredential(cred, password) {
        console.log(cred + " : " + password);
        if (validator.isEmail(cred)) {
            console.log("email");
            return User.loginByEmail(cred, password);
        }
        else {
            console.log("username");
            return User.loginByUsername(cred, password);
        }
    }
    static loginByEmail(email, password) {
        let tempUser = null;
        return User.findOne({ email }).exec().then((user) => {
            tempUser = user;
            return User.comparePassword(password, user.password);
        }).then((isMatch) => {
            if (isMatch) {
                return tempUser;
            }
        });
    }
    static loginByUsername(username, password) {
        let tempUser = null;
        console.log("Username login");
        return User.findOne({ username }).exec().then((user) => {
            tempUser = user;
            return User.comparePassword(password, user.password);
        }).then((isMatch) => {
            if (isMatch) {
                return tempUser;
            }
        });
    }
    getInfo() {
        return _.pick(this._document, ['_id', 'username', 'email', 'name', 'followers']);
    }
    getFollowers() {
        return User.find({ _id: { $in: this._document.followers } }).exec();
    }
}
exports.User = User;
//Is called every time before saving a user. Hashes password if it's modified
user_model_1.UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                throw err;
            }
            user.password = hash;
            next();
        });
    }
    else {
        next();
    }
});
//# sourceMappingURL=user.logic.js.map
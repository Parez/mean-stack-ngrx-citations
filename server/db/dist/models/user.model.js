/**
 * Created by baunov on 28/11/16.
 */
"use strict";
const mongoose = require('mongoose');
const validator = require('validator');
;
;
exports.UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: { type: String },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    followers: [{ type: String, ref: 'User' }],
    /*tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }],*/
    //Rank of the User (sum up ranks of all his citations)
    //TODO make an indexed field (createIndex())
    rank: { type: Number, default: 0, index: true }
});
exports.UserModel = mongoose.model('User', exports.UserSchema);
//# sourceMappingURL=user.model.js.map
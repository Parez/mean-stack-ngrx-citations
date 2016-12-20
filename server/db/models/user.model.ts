/**
 * Created by baunov on 28/11/16.
 */

import * as mongoose from 'mongoose';
import * as validator from 'validator';

//basic user info embedded document will include:
//-username
//-name
//-email

export interface IUserInfo {
  username: string;
  name: number;
  email: string;
  _id: string;
};

export interface IUser extends mongoose.Document {
  username: string;
  name: string;
  password: string;
  email: string;
  followers: Array<string>; //will push all published citations to followers' feed
  //tokens:Array<Object>;
};

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {type: String}, //name will be displayed on a post/citation if provided. Otherwise - username

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
  followers: [{type: String, ref: 'User'}], //list of followers
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
  rank: {type: Number, default: 0, index: true}
});

export const UserModel = mongoose.model < IUser > ('User', UserSchema);
